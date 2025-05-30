import React, { useState, FormEvent } from "react";
import { postRecipe } from "./api";
import { BrewRecipe } from "./types";

type NewRecipe = Omit<BrewRecipe, "id" | "hopSchedule">;

interface Props {
  onCreated: (recipe: BrewRecipe) => void;
}

export default function AddRecipeForm({ onCreated }: Props) {
  // Form state
  const [form, setForm] = useState<NewRecipe>({
    name: "",
    style: "",
    batchSizeLiters: 0,
    mashTempC: 0,
    mashTimeMin: 0,
    boilTimeMin: 0,
    yeast: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof NewRecipe>(key: K, value: NewRecipe[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // send an empty hopSchedule for now
      const created = await postRecipe({ ...form, hopSchedule: [] });
      onCreated(created);
      // reset
      setForm({
        name: "",
        style: "",
        batchSizeLiters: 0,
        mashTempC: 0,
        mashTimeMin: 0,
        boilTimeMin: 0,
        yeast: "",
        notes: "",
      });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>Add New Recipe</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Name:{" "}
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Style:{" "}
          <input
            value={form.style}
            onChange={(e) => updateField("style", e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Batch Size (L):{" "}
          <input
            type="number"
            value={form.batchSizeLiters}
            onChange={(e) =>
              updateField("batchSizeLiters", parseFloat(e.target.value))
            }
            required
          />
        </label>
      </div>
      <div>
        <label>
          Mash Temp (°C):{" "}
          <input
            type="number"
            value={form.mashTempC}
            onChange={(e) =>
              updateField("mashTempC", parseInt(e.target.value, 10))
            }
            required
          />
        </label>
      </div>
      <div>
        <label>
          Mash Time (min):{" "}
          <input
            type="number"
            value={form.mashTimeMin}
            onChange={(e) =>
              updateField("mashTimeMin", parseInt(e.target.value, 10))
            }
            required
          />
        </label>
      </div>
      <div>
        <label>
          Boil Time (min):{" "}
          <input
            type="number"
            value={form.boilTimeMin}
            onChange={(e) =>
              updateField("boilTimeMin", parseInt(e.target.value, 10))
            }
            required
          />
        </label>
      </div>
      <div>
        <label>
          Yeast:{" "}
          <input
            value={form.yeast}
            onChange={(e) => updateField("yeast", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Notes:{" "}
          <textarea
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </label>
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: 12 }}>
        {loading ? "Saving…" : "Add Recipe"}
      </button>
    </form>
  );
}
