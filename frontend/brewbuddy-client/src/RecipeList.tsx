import React from "react";
import { BrewRecipe } from "./types";

interface Props {
  recipes: BrewRecipe[];
}

// A simple list component to display each recipe
export default function RecipeList({ recipes }: Props) {
  if (recipes.length === 0) {
    return <p>No recipes yet. Try adding one!</p>;
  }

  return (
    <div>
      {recipes.map((r) => (
        <div
          key={r.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginBottom: "8px",
            borderRadius: "4px",
          }}
        >
          <h3>{r.name} <small>({r.style})</small></h3>
          <p>
            Batch: {r.batchSizeLiters} L • Mash: {r.mashTempC} °C for{" "}
            {r.mashTimeMin} min • Boil: {r.boilTimeMin} min
          </p>
          <p>Yeast: {r.yeast}</p>
          {r.hopSchedule.length > 0 && (
            <ul>
              {r.hopSchedule.map((h) => (
                <li key={h.id}>
                  {h.hopName}: {h.amountGrams} g @ {h.timeMin} min
                </li>
              ))}
            </ul>
          )}
          {r.notes && <p><em>Notes:</em> {r.notes}</p>}
        </div>
      ))}
    </div>
  );
}
