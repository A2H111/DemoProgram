using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsDetailsAPI.Helper
{
	public class ModeltoDataContractMapping
	{
		public DataContract.Product MapModelProducttoDataContractProduct(Models.Product productModel)
		{
			DataContract.Product productDC = new DataContract.Product();
			productDC.ProductId = productModel.ProductId.ToString();
			productDC.ProductCategory = productModel.ProductCategory;
			productDC.ProductDescription = productModel.ProductDescription;
			productDC.ProductName = productModel.ProductName;
			productDC.ProductPrice = productModel.ProductPrice.ToString();
			productDC.ProductStockLevel = productModel.ProductStockLevel.ToString();

			return productDC;
		}
	}
}
