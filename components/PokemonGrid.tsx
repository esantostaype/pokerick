import { PokemonCard } from '@/components'
import type { SimplePokemon } from '@/interfaces'

type Props = {
  pokemons: SimplePokemon[]
}

export const PokemonGrid = ({ pokemons }: Props) => {

  return (
    <ul className="pokemon-app__list">
      { pokemons.map(( pokemon ) => (
        <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
      ))}
    </ul>
  )
}