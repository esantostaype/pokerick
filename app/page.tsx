import type { Metadata } from 'next'
import { MaterialPagination, Pagination, PokemonGrid } from '@/components'
import { getPokemons } from '@/services/pokeApi'

export const metadata: Metadata = {
  title: "Pokémon App",
  description:
    "Explora el universo Pokémon. Descubre detalles, estadísticas y habilidades de cada Pokémon. ¡Conviértete en el mejor entrenador Pokémon con la información más precisa y actualizada."
}

type Props = {
  searchParams: {
    page: string
  }
}

export default async function HomePage({ searchParams }: Props) {
  const page = +searchParams.page || 1
  const limit = 10
  const offset = ( page - 1 ) * limit
  const data = await getPokemons( limit, offset )
  const totalPages = Math.ceil( data.pokemonData.count / limit )
  return (
    <>
    <PokemonGrid pokemons={ data.pokemons } />
    <MaterialPagination page={ page } totalPages={ totalPages } link='/' />
    </>
  )
}