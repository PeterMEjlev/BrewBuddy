using Microsoft.EntityFrameworkCore;
using BrewBuddy.API.Models;

namespace BrewBuddy.API.Data;
public class BrewBuddyContext : DbContext {
  public BrewBuddyContext(DbContextOptions<BrewBuddyContext> opts) : base(opts) { }
  public DbSet<BrewRecipe> BrewRecipes { get; set; }
  public DbSet<HopAddition> HopAdditions { get; set; }
}
