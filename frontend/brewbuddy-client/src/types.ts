// Describe the shape of our data coming from /api/recipes

export interface HopAddition {
  id: number;
  hopName: string;
  amountGrams: number;
  timeMin: number;
  brewRecipeId: number;
}

export interface BrewRecipe {
  id: number;
  name: string;
  style: string;
  batchSizeLiters: number;
  mashTempC: number;
  mashTimeMin: number;
  boilTimeMin: number;
  yeast: string;
  notes: string;
  hopSchedule: HopAddition[];
}
