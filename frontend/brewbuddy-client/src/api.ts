import { BrewRecipe } from "./types";

const BASE = "/api/recipes";

// Fetch all recipes
export async function fetchRecipes(): Promise<BrewRecipe[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to load recipes");
  return res.json();
}

// Create a new recipe
export async function postRecipe(recipe: Omit<BrewRecipe, "id">): Promise<BrewRecipe> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error("Failed to create recipe");
  return res.json();
}

// (Later you can add updateRecipe, deleteRecipe here…)
