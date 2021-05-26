using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductsDetailsAPI.Helper
{
	public class DataContracttoModelMapping
	{

		public Models.Product MapDataContractProducttoModelProduct(DataContract.Product productDC)
		{
			Models.Product productModel = new Models.Product();
			productModel.ProductId = productDC.ProductId != null ? int.Parse(productDC.ProductId):0;
			productModel.ProductCategory = productDC.ProductCategory;
			productModel.ProductDescription = productDC.ProductDescription;
			productModel.ProductName = productDC.ProductName;
			productModel.ProductPrice = Convert.ToDecimal(productDC.ProductPrice);
			productModel.ProductStockLevel = Convert.ToInt32(productDC.ProductStockLevel);

			return productModel;
		}
	}
}
