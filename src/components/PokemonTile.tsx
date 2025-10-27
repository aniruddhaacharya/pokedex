import React from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  image?: string | null;
}

const PokemonTile = React.memo(({ name, image }: Props) => {
  const displayName = name
    .split("-")
    .join(" ");

  return (
    <Link to={`/pokemon/${name}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="tile">
        <img
          src={image ?? ""}
          alt={`${displayName} sprite`}
          loading="lazy"
          width={96}
          height={96}
        />
        <div>{displayName.toUpperCase()}</div>
      </div>
    </Link>
  );
});

export default PokemonTile;
