import type { Metadata } from "next";
import { PokemonGrid } from "../components";

export const metadata: Metadata = {
  title: "Pokémon App",
  description:
    "Explora el universo Pokémon. Descubre detalles, estadísticas y habilidades de cada Pokémon. ¡Conviértete en el mejor entrenador Pokémon con la información más precisa y actualizada.",
};

export default async function HomePage() {
  return <PokemonGrid />;
}
