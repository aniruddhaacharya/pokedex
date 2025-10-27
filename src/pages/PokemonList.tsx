import '../styles/pokeman-list.css';
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchPokemonList } from "../api/pokemon";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorView from "../components/ErrorView";
import PokemonTile from "../components/PokemonTile";
import type { NamedAPIResource } from "../types/pokemon";

type TileData = { name: string; image?: string | null };

export default function PokemonList() {
  const [items, setItems] = useState<TileData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const SCROLL_KEY = "pokedex_scroll_y";
  const scrollRestored = useRef(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchPokemonList(50, 0);
      const tiles: TileData[] = list.results.map((r: NamedAPIResource) => {
        const id = r.url.split("/").filter(Boolean).pop();
        return {
          name: r.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
      setItems(tiles);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  // getting scroll position 
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    if (!loading && !scrollRestored.current) {
      const savedY = sessionStorage.getItem(SCROLL_KEY);
      if (savedY) {
        window.scrollTo(0, parseInt(savedY, 10));
      }
      scrollRestored.current = true;
    }
  }, [loading]);

  // Save scroll before going to details
  useEffect(() => {
    return () => {
      sessionStorage.setItem(SCROLL_KEY, window.scrollY.toString());
    };
  }, [location.pathname]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <div className="grid">
      {items!.map((p) => (
        <PokemonTile key={p.name} name={p.name} image={p.image} />
      ))}
    </div>
  );
}
