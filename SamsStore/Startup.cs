using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using SamsStore.Data;
using Swashbuckle.AspNetCore.Swagger;
using AutoMapper;
using SamsStore.DTO;

namespace SamsStore
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
                //AddDbContext******
                services.AddDbContext<SalesDbContext>(
                    options => options.UseSqlServer(Configuration.GetConnectionString("SalesDBConn"))
                    );
                services.AddControllersWithViews();

                // In production, the React files will be served from this directory
                services.AddSpaStaticFiles(configuration =>
                {
                    configuration.RootPath = "ClientApp/build";
                });

                //Add *****
                services.AddSwaggerGen();
                //Automapper
                services.AddAutoMapper(typeof(Startup));
        }

        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler("/Error");
                    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                    app.UseHsts();
                }

                app.UseHttpsRedirection();
                app.UseStaticFiles();
                app.UseSpaStaticFiles();
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseRouting();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller}/{action=Index}/{id?}");
                });

                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "ClientApp";

                    if (env.IsDevelopment())
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                });
        }
    }
}
