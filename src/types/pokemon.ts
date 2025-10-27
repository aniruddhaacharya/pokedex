export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: NamedAPIResource[];
  count: number;
  next?: string | null;
  previous?: string | null;
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonType {
  slot: number;
  type: { name: string };
}

export interface PokemonAbility {
  ability: { name: string };
  is_hidden: boolean;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  stats: PokemonStat[];
  types: PokemonType[];
  abilities: PokemonAbility[];
}
