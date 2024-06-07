import type { Metadata } from 'next'
import { MaterialPagination, PokemonGrid } from '@/components'
import { getPokemonTypes, getPokemons, getPokemonsByFilters } from '@/services/pokeApi'

export const metadata: Metadata = {
  title: "Pokémon App",
  description:
    "Explora el universo Pokémon. Descubre detalles, estadísticas y habilidades de cada Pokémon. ¡Conviértete en el mejor entrenador Pokémon con la información más precisa y actualizada."
}

type Props = {
  searchParams: {
    page: string
    q: string
    type: string
  }
}

export default async function HomePage({ searchParams }: Props) {
  const page = +searchParams.page || 1
  const query = searchParams.q || ''
  const type = searchParams.type || ''
  const limit = 10
  const offset = (page - 1) * limit
  const link = '/'

  const validTypes = await getPokemonTypes()
  const isValidType = validTypes.includes(type.toLowerCase())

  let data
  if ( query || ( isValidType && type )) {
    data = {
      pokemons: await getPokemonsByFilters( query, isValidType ? type : undefined ),
      pokemonData: { count: 1 }
    }
  } else {
    data = await getPokemons(limit, offset)
  }

  const totalPages = Math.ceil(data.pokemonData.count / limit)

  return (
    <>
      { data.pokemons.length === 0 && <p>No se encontraron resultados</p> }
      { data.pokemons.length > 0 && (
        <>
          <PokemonGrid pokemons={ data.pokemons } />
          {!query && !type && (
            <MaterialPagination page={ page } totalPages={ totalPages } link={ link } />
          )}
        </>
      )}
    </>
  )
}