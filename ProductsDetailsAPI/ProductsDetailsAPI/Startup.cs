using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ProductsDetailsAPI.DataAccess;
using Microsoft.EntityFrameworkCore;
using ProductsDetailsAPI.Repository;

namespace ProductsDetailsAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //services.AddDbContext<SalesDBContext>(options => options.UseSqlServer(Configuration) );
            services.AddSingleton< IProductsRepository, ProductsRepository >(serviceProvider =>
            {
                var builder = new DbContextOptionsBuilder<ProductsDBContext>();
                builder.UseSqlite("Data Source=./productdetails.db");
                return new ProductsRepository(builder.Options);
            });

            //services.AddDbContext<SalesDBContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("DefaultDBConnection")));
            //services.AddSingleton<IProductsRepository, ProductsRepository>(serviceProvider => {
            //    var builder = new DbContextOptionsBuilder<ProductsDBContext>();
            //    builder.UseSqlServer(Configuration.GetConnectionString("DefaultDBConnection"));
            //    return new ProductsRepository(builder.Options);
            //});

            services.AddCors(options =>
            {
                options.AddPolicy(name: "ProductsDetailsCorsPolicy",
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:4200")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials();
                                  });
            });
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("ProductsDetailsCorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
