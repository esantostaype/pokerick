import type { Metadata } from 'next'
import { PokemonGrid } from '@/components'
import { getPokemonTypes, getPokemonsByType } from '@/services/pokeApi'
import NotFound from './not-found'

export const metadata: Metadata = {
  title: "Pokémon App",
  description:
    "Explora el universo Pokémon. Descubre detalles, estadísticas y habilidades de cada Pokémon. ¡Conviértete en el mejor entrenador Pokémon con la información más precisa y actualizada."
}

type Props = {
  params: {
    type: string
  }
}

type Type = {
  type: string
  index: number
}[]

export async function generateStaticParams() {
  const data: Type = await getPokemonTypes()

  const staticPokemons = data.map(( type ) => ({
    name: type,
  }))

  return staticPokemons.map(({ name }) => ({
    name: name
  }))
}

export default async function TypePage({ params } : Props ) {
  try {
    const pokemons = await getPokemonsByType( params.type )
    return(
      <>
      <h1>{ pokemons.typeName }</h1>
      <PokemonGrid pokemons={ pokemons.pokemons } />
      </>
    )
  } catch ( error ) {
    return <NotFound/>
  }
}