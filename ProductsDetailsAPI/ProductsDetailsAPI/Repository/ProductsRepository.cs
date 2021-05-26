using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ProductsDetailsAPI.DataAccess;
using DATACONTRACTS = ProductsDetailsAPI.DataContract;
using ProductsDetailsAPI.Models;
using ProductsDetailsAPI.Helper;

namespace ProductsDetailsAPI.Repository
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly DbContextOptions<ProductsDBContext> _options;
        //an event is raised so that stored procedures can be tested
        //this is just a testing hook and is not part of the interface
        public delegate void DatabaseContextCreated(object sender, ProductsDBContext salesDBContext);
        public event DatabaseContextCreated OnDatabaseContextCreated;

        public ProductsRepository(DbContextOptions<ProductsDBContext> options)
        {
            _options = options;
        }      

        private ProductsDBContext CreateProductsDBContext()
        {
            var context = new ProductsDBContext(_options);
            OnDatabaseContextCreated?.Invoke(this, context);
            return context;
        }

        public List<DATACONTRACTS.Product> GetProductsDetails()
        {
            using (var dataContext = CreateProductsDBContext())
            {
                var results = dataContext.ProductsDetails.ToList();
                return GetProductDetails(results);
            }
        }

        public List<DATACONTRACTS.Product> GetProductDetailsByProductName(string searchParam)
        {
            using (var dataContext = CreateProductsDBContext())
            {
                var results = dataContext.ProductsDetails
                              .Where(i =>i.ProductName.ToLower().StartsWith(searchParam.ToLower()))
                              .ToList();   
                return GetProductDetails(results);
            }
        }

        private List<DATACONTRACTS.Product> GetProductDetails(List<Product> products)
        {
            List<DATACONTRACTS.Product> lstProducts = new List<DATACONTRACTS.Product>();
            ModeltoDataContractMapping modeltoDataContractMapping = new ModeltoDataContractMapping();
            foreach (Product product in products)
            {
                lstProducts.Add(modeltoDataContractMapping.MapModelProducttoDataContractProduct(product));
            }
            return lstProducts;
        }


        public string InsertProductsDetails(DataContract.Product inputProductValue)
        {
            try
            {
                using (var dataContext = CreateProductsDBContext())
                {
                    DataContracttoModelMapping dataContracttoModelMapping = new DataContracttoModelMapping();
                    dataContext.ProductsDetails.Add(dataContracttoModelMapping.MapDataContractProducttoModelProduct(inputProductValue));
                    dataContext.SaveChanges();
                    return "Value entered succesfully";                    
                }
            }
            catch (Exception e)
            {
                return e.Message;
            }
            
        }

        public async Task<Product> UpdateProductsDetails(DataContract.Product UpdateItem)
        {
            try
            {
                using (var dataContext = CreateProductsDBContext())
                {
                    int idvalue = 0;
                    int.TryParse(UpdateItem.ProductId,out idvalue);
                    var productItem = dataContext.ProductsDetails.Find(idvalue);
                    if (productItem != null)
                    {
                        if (int.Parse(UpdateItem.ProductId) != 0)
                        {
                            productItem.ProductId = int.Parse(UpdateItem.ProductId);
                        }
                        if (UpdateItem.ProductName != null)
                        {
                            productItem.ProductName = UpdateItem.ProductName;
                        }
                        if (decimal.Parse(UpdateItem.ProductPrice) != 0)
                        {
                            productItem.ProductPrice = decimal.Parse(UpdateItem.ProductPrice);
                        }
                        if (UpdateItem.ProductDescription != null)
                        {
                            productItem.ProductDescription = UpdateItem.ProductDescription;
                        }
                        if (int.Parse(UpdateItem.ProductStockLevel) != 0)
                        {
                            productItem.ProductStockLevel = int.Parse(UpdateItem.ProductStockLevel);
                        }
                        if (UpdateItem.ProductCategory != null)
                        {
                            productItem.ProductCategory = UpdateItem.ProductCategory;
                        }
                        await dataContext.SaveChangesAsync();
                    }
                    return productItem;
                }
            }
            catch (Exception e)
            {
                return new Product();
            }
        }

        public async Task<int> DeleteProductsDetails(List<DataContract.Product> productIds)
        {
            int deletedRecordsCount = 0;
			try
			{
				using (var dataContext = CreateProductsDBContext())
				{
					foreach (var item in productIds)
					{
						var productItemQuery = from productItem in dataContext.ProductsDetails
											   where productItem.ProductId == Convert.ToInt32(item.ProductId)
											   select productItem;
						if (productItemQuery.Count() > 0)
						{
							dataContext.Remove(productItemQuery.FirstOrDefault<Product>());
							deletedRecordsCount++;
						}
					}
					await dataContext.SaveChangesAsync();
					return deletedRecordsCount;
				}
			}
			catch (Exception e)
			{
				return deletedRecordsCount;
			}
		}


       
    }
}
