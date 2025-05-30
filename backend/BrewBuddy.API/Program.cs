using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BrewBuddy.API.Data;
using BrewBuddy.API.Models;

var builder = WebApplication.CreateBuilder(args);

// OpenAPI/Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext
builder.Services.AddDbContext<BrewBuddyContext>(opts =>
    opts.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// —————— CRUD routes ——————

app.MapGet("/api/recipes", async (BrewBuddyContext db) =>
    await db.BrewRecipes.Include(r => r.HopSchedule).ToListAsync())
   .WithName("GetAllRecipes");

app.MapGet("/api/recipes/{id}", async (int id, BrewBuddyContext db) =>
    await db.BrewRecipes.Include(r => r.HopSchedule).FirstOrDefaultAsync(r => r.Id == id)
        is BrewRecipe recipe ? Results.Ok(recipe) : Results.NotFound())
   .WithName("GetRecipeById");

app.MapPost("/api/recipes", async (BrewRecipe rec, BrewBuddyContext db) =>
{
    db.BrewRecipes.Add(rec);
    await db.SaveChangesAsync();
    return Results.Created($"/api/recipes/{rec.Id}", rec);
})
.WithName("CreateRecipe");

app.MapPut("/api/recipes/{id}", async (int id, BrewRecipe input, BrewBuddyContext db) =>
{
    var exists = await db.BrewRecipes.FindAsync(id);
    if (exists is null) return Results.NotFound();

    // Overwrite scalar properties
    db.Entry(exists).CurrentValues.SetValues(input);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("UpdateRecipe");

app.MapDelete("/api/recipes/{id}", async (int id, BrewBuddyContext db) =>
{
    var rec = await db.BrewRecipes.FindAsync(id);
    if (rec is null) return Results.NotFound();
    db.BrewRecipes.Remove(rec);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("DeleteRecipe");

// ——————————————————————

app.Run();
