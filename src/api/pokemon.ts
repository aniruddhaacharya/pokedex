import type { Pokemon, PokemonListResponse } from "../types/pokemon";

const BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit = 50, offset = 0): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  return res.json();
}

export async function fetchPokemon(nameOrId: string): Promise<Pokemon> {
  const res = await fetch(`${BASE}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error("Failed to fetch pokemon details");
  return res.json();
}
