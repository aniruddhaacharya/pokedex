import React from "react";
import { Link } from "react-router-dom";

export default function PokemonTile({ name, image }: { name: string; image?: string | null }) {
  const displayName = name[0].toUpperCase() + name.slice(1);
  return (
    <Link to={`/pokemon/${name}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="tile">
        <img src={image ?? ""} alt={`${displayName} sprite`} loading="lazy" width={96} height={96} />
        <div>{displayName}</div>
      </div>
    </Link>
  );
}
