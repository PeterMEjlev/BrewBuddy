namespace BrewBuddy.API.Models;
public class HopAddition {
  public int Id { get; set; }
  public string HopName { get; set; }
  public double AmountGrams { get; set; }
  public int TimeMin { get; set; }
  public int BrewRecipeId { get; set; }
  public BrewRecipe BrewRecipe { get; set; }
}
