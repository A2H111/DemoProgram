using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using ProductsDetailsAPI.Controllers;
using ProductsDetailsAPI.Repository;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductsDetailsAPI.Models;

namespace ProductsDetailsAPI.Tests.Controllers
{
    [TestFixture]
    public class ProductControllerTests
    {
         private ProductsController _ProductsController;
        private Mock<IProductsRepository> _MockProductsRepository;
        private List<DataContract.Product> _MockProducts;
        //private DataContract.Product _MockProduct;

        [SetUp]
        public void Setup()
        {
            _MockProductsRepository=new Mock<IProductsRepository>();            
            _MockProducts=new List<DataContract.Product>();
            _MockProducts.Add(new DataContract.Product());

            _ProductsController = new ProductsController(_MockProductsRepository.Object);   
            
        }

        [Test]
        public void GetProductsDetails_Should_Return_Status_Code_200_When_Prodcts_Are_Returned()
        {
            _MockProductsRepository.Setup(p => p.GetProductsDetails()).Returns(_MockProducts);
            var result = _ProductsController.GetProductsDetails();
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public void GetProductsDetailsByProductName_Should_Return_Status_Code_200_When_Prodcts_Are_Returned()
        {
            _MockProductsRepository.Setup(p => p.GetProductDetailsByProductName(It.IsAny<string>())).Returns(_MockProducts);
            var result = _ProductsController.GetProductsDetails();
            Assert.IsInstanceOf<OkObjectResult>(result);
        }

        [Test]
        public void InsertProductsDetails_Should_Return_Status_Code_201_When_Prodcts_Are_Returned()
        {
            _MockProductsRepository.Setup(p => p.InsertProductsDetails(It.IsAny<DataContract.Product>())).Returns("Value entered succesfully");
            var result = _ProductsController.InsertProductsDetails(It.IsAny<DataContract.Product>());
            Assert.IsInstanceOf<CreatedResult>(result);
            Assert.AreEqual(result.Value, "Value entered succesfully");
        }

        [Test]
        public void UpdateProductsDetails_Should_Return_Status_Code_200_When_Prodcts_Are_Updated()
        {
            _MockProductsRepository.Setup(p => p.UpdateProductsDetails(It.IsAny<DataContract.Product>())).Returns(Task.FromResult(new Product()));
            var value = _ProductsController.UpdateProductsDetails(It.IsAny<DataContract.Product>());
            Assert.IsInstanceOf<OkObjectResult>(value.Result);
        }

        [Test]
        public void Delete_Should_Return_NoContent_Status_Code_When_Prodcts_Got_Deleted()
        {
            int[] ProductId = new int[] { 1 };
            SearchInput input = new SearchInput()
            {
                ProductId = new int[] { 1 }
            };
        
            _MockProductsRepository.Setup(p => p.DeleteProductsDetails(input)).Returns(Task.FromResult(1));
            var value = _ProductsController.Delete(input);
            Assert.IsInstanceOf<NoContentResult>(value.Result);
        } 
    }
}
