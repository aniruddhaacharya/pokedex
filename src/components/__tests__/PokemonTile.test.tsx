import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PokemonTile from "../PokemonTile";

test("renders Pokémon name", () => {
  render(
    <MemoryRouter>
      <PokemonTile name="pikachu" image="/pikachu.png" />
    </MemoryRouter>
  );

  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
});
