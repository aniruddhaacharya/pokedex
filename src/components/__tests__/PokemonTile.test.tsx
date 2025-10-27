import { render, screen } from "@testing-library/react";
import PokemonTile from "../PokemonTile";

test("renders Pokémon name", () => {
  render(<PokemonTile name="pikachu" image="/pikachu.png" />);
  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
});
