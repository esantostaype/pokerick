import type { Metadata } from 'next'
import { PokemonGrid } from '@/components'
import { getPokemonTypes, getPokemonsByFilters } from '@/services/pokeApi'

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

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || ''
  const type = searchParams.type || ''
  const validTypes = await getPokemonTypes()
  const isValidType = validTypes.includes(type.toLowerCase())

  const data = await getPokemonsByFilters( query, isValidType ? type : undefined )

  return (
    <>
      { data.length === 0 && <p>No se encontraron resultados</p>}
      { data.length > 0 && (
        <>
          <PokemonGrid pokemons={data} />
        </>
      )}
    </>
  )
}