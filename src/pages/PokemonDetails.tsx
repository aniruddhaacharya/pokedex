import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemon } from "../api/pokemon";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorView from "../components/ErrorView";
import type { Pokemon } from "../types/pokemon";
import '../styles/pokemon-details.css'

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
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="details-card">
        <div className="header">
          <img
            src={pokemon.sprites.front_default ?? ""}
            alt={displayName}
            className="pokemon-image"
          />
          <h2>{displayName}</h2>
          <span className="pokemon-id">{pokemon.id}</span>
        </div>

        <div className="info-section">
          <p><strong>Height:</strong> {pokemon.height}</p>
          <p><strong>Weight:</strong> {pokemon.weight}</p>
        </div>

        <div className="types-section">
          <h3>Types</h3>
          <div className="types">
            {pokemon.types.map((t) => (
              <span key={t.slot} className={`type-badge ${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="abilities-section">
          <h3>Abilities</h3>
          <div className="abilities">
            {pokemon.abilities.map((a) => (
              <span key={a.ability.name} className="ability-badge">
                {a.ability.name}
                {a.is_hidden ? " (Hidden)" : ""}
              </span>
            ))}
          </div>
        </div>

        <div className="stats-section">
          <h3>Stats</h3>
          <div className="stats">
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className="stat-row">
                <span className="stat-name">{s.stat.name}</span>
                <div className="stat-bar">
                  <div
                    className="stat-fill"
                    style={{ width: `${(s.base_stat / 200) * 100}%` }}
                  ></div>
                </div>
                <span className="stat-value">{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

