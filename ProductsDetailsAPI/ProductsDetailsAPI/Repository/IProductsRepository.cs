using ProductsDetailsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DATACONTRACTS = ProductsDetailsAPI.DataContract;

namespace ProductsDetailsAPI.Repository
{
    public interface IProductsRepository
    {
        List<DATACONTRACTS.Product> GetProductsDetails();
        List<DATACONTRACTS.Product> GetProductDetailsByProductName(string searchParam);
        string InsertProductsDetails(DataContract.Product inputProductValue);
        Task<int> DeleteProductsDetails(List<DataContract.Product> productIds);
        Task<Product> UpdateProductsDetails(DataContract.Product UpdateItem);
    }
}
