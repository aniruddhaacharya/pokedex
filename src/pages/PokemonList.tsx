import React, { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemon } from "../api/pokemon";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorView from "../components/ErrorView";
import PokemonTile from "../components/PokemonTile";
import type { NamedAPIResource } from "../types/pokemon";

type TileData = { name: string; image?: string | null };

export default function PokemonList() {
  const [items, setItems] = useState<TileData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchPokemonList(50, 0);
      // PokeAPI returns name + url — we want sprite for each. We'll fetch details in parallel but keep it simple
      const detailsPromises = list.results.map((r: NamedAPIResource) =>
        fetch(r.url).then((res) => {
          if (!res.ok) throw new Error("detail fetch failed");
          return res.json();
        })
      );
      const details = await Promise.allSettled(detailsPromises);
      const tiles: TileData[] = details.map((d, i) => {
        if (d.status === "fulfilled") {
          return { name: d.value.name, image: d.value.sprites.front_default };
        } else {
          // fallback to name only (no image)
          return { name: list.results[i].name, image: null };
        }
      });
      setItems(tiles);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <div>
      <div className="grid">
        {items!.map((p) => (
          <PokemonTile key={p.name} name={p.name} image={p.image} />
        ))}
      </div>
    </div>
  );
}
