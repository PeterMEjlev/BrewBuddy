using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// 1) Register the OpenAPI services:
builder.Services.AddEndpointsApiExplorer();  // ← note the full name
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2) Enable Swagger UI when in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 3) (Optional) redirect HTTP → HTTPS
app.UseHttpsRedirection();

// 4) Minimal “ping” endpoint
app.MapGet("/api/ping", () => Results.Ok("pong"))
   .WithName("Ping");

app.Run();
