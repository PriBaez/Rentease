using Microsoft.EntityFrameworkCore;
using SDGAV.interfaces;
using SDGAV.Models;
using SDGAV.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<SDGAVContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("db")));
builder.Services.AddScoped<IUser, UserServices>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
