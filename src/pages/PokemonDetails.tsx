import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemon } from "../api/pokemon";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorView from "../components/ErrorView";
import type { Pokemon } from "../types/pokemon";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    setError(null);
    fetchPokemon(name)
      .then((p) => setPokemon(p))
      .catch((e) => setError(e.message ?? "Failed to load"))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorView message={error} onRetry={() => navigate(0)} />;

  if (!pokemon) return null;

  const displayName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const getStat = (statName: string) =>
    pokemon.stats.find((s) => s.stat.name.toLowerCase() === statName)?.base_stat ?? "-";

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>{displayName} (#{pokemon.id})</h2>
      <img src={pokemon.sprites.front_default ?? ""} alt={`${displayName} sprite`} />
      <p>Height: {pokemon.height} — Weight: {pokemon.weight}</p>

      <div>
        <h3>Types</h3>
        <div style={{ display: "flex", gap: 8 }}>
          {pokemon.types.map((t) => (
            <span key={t.slot} className="badge">{t.type.name}</span>
          ))}
        </div>
      </div>

      <div>
        <h3>Abilities</h3>
        <div style={{ display: "flex", gap: 8 }}>
          {pokemon.abilities.map((a) => (
            <span key={a.ability.name} className="badge">{a.ability.name}{a.is_hidden ? " (hidden)" : ""}</span>
          ))}
        </div>
      </div>

      <div>
        <h3>Key stats</h3>
        <ul>
          <li>HP: {getStat("hp")}</li>
          <li>Attack: {getStat("attack")}</li>
          <li>Defense: {getStat("defense")}</li>
        </ul>
      </div>
    </div>
  );
}
