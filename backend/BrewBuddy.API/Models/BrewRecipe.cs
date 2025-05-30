namespace BrewBuddy.API.Models;
public class BrewRecipe {
  public int Id { get; set; }
  public string Name { get; set; }
  public string Style { get; set; }
  public double BatchSizeLiters { get; set; }
  public int MashTempC { get; set; }
  public int MashTimeMin { get; set; }
  public int BoilTimeMin { get; set; }
  public string Yeast { get; set; }
  public string Notes { get; set; }
  public List<HopAddition> HopSchedule { get; set; }
}
