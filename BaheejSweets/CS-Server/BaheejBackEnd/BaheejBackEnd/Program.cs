using BaheejBackEnd.MongoDB;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using WebSocketSharp;
using WebSocketSharp.Server;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<MongoDBWrapper>();
builder.Services.AddSingleton<WebSocketServer>(_ =>
{
    var wssv = new WebSocketServer("ws://localhost:8080");
    //Use the add socket Service here
    return wssv;
});
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
