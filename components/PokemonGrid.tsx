'use client'
import { useState, useEffect } from 'react'
import { PokemonCard, Spinner } from '@/components'
import { getPokemons } from '@/services/pokeApi'
import type { SimplePokemon } from '@/interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'

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