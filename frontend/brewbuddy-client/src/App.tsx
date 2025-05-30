import React, { useEffect, useState } from "react";
import { fetchRecipes } from "./api";
import { BrewRecipe } from "./types";
import RecipeList from "./RecipeList";
import AddRecipeForm from "./AddRecipeForm";

export default function App() {
  // State for recipes, loading & errors
  const [recipes, setRecipes] = useState<BrewRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchRecipes()
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🐝 BrewBuddy Recipes</h1>

      {/* Add‐recipe form */}
      <AddRecipeForm onCreated={(newR) => setRecipes((r) => [...r, newR])} />

      {/* Loading & error states */}
      {loading && <p>Loading recipes…</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Recipe list */}
      {!loading && !error && <RecipeList recipes={recipes} />}
    </div>
  );
}
