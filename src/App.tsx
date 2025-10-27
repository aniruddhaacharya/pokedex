import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";

export default function App() {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Pokedex</h1>
        </Link>
      </header>

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </main>
    </div>
  );
}
