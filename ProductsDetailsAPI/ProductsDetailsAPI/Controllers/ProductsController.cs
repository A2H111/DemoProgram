using Microsoft.AspNetCore.Mvc;
using ProductsDetailsAPI.Models;
using ProductsDetailsAPI.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductsDetailsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductsRepository _productsRepository;

        public ProductsController(IProductsRepository productsRepository)
        {
            _productsRepository = productsRepository;
        }

        [HttpGet]
        [Route("GetProductsDetails")]
        public IActionResult GetProductsDetails()
        {
            try
            {
                var results = _productsRepository.GetProductsDetails();
                return Ok(results);
            }
            catch (Exception ex)
            {
                //Here we wil have the log method call to log the exception
                return StatusCode(500, "Internal server error" );
            }
        }


		[HttpGet]
		[Route("GetProductDetailsByProductName")]
		public IActionResult GetProductsDetailsByProductName([FromQuery] string searchParam)
		{
            try
            {
                var results = _productsRepository.GetProductDetailsByProductName(searchParam);
			    return Ok(results);
            }
            catch (Exception ex)
            {
                //Here we wil have the log method call to log the exception
                return StatusCode(500, "Internal server error");
            }
        }

		[HttpPost]
        [Route("InsertProductsDetails")]
        public IActionResult InsertProductsDetails([FromBody]DataContract.Product inputValue)
        {
            try
            {
                var result = _productsRepository.InsertProductsDetails(inputValue);
                return Created("", result);
            }
            catch (Exception ex)
            {
                //Here we wil have the log method call to log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        [Route("UpdateProductsDetails")]
        public async Task<IActionResult> UpdateProductsDetails([FromBody]DataContract.Product UpdateItem)
        {
            try
            {
                var result = await _productsRepository.UpdateProductsDetails(UpdateItem);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                //Here we wil have the log method call to log the exception
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost]
        [Route("DeleteProductsDetails")]
        public async Task<IActionResult> DeleteProductsDetails([FromBody] List<DataContract.Product> productIds)
        {
            try
            {
                var result = await _productsRepository.DeleteProductsDetails(productIds);
                if (result > 0)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {

                //Here we wil have the log method call to log the exception
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
