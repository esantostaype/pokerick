'use client'
import { useState, useEffect } from 'react'
import { PokemonCard, Spinner } from '@/components'
import { getPokemons } from '@/services/pokeApi'
import type { SimplePokemon } from '@/interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'

export const PokemonGrid = () => {
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const fetchMorePokemons = async () => {
    const newPokemons = await getPokemons( 10, offset )
    setPokemons((prev) => [ ...prev, ...newPokemons ])
    setOffset((prev) => prev + 10)
    if ( newPokemons.length < 10 ) {
      setHasMore( false )
    }
  }

  useEffect(() => {
    fetchMorePokemons()
  }, [])

  return (
    <InfiniteScroll
      dataLength={ pokemons.length }
      style={{ width: '100%', overflow: 'initial' }}
      next={ fetchMorePokemons }
      hasMore={ hasMore }
      loader={ <div className='infiniteLoading'><Spinner/></div> }
      endMessage={ <p className='infiniteFinalText'>Yay! You have seen it all :)</p> }
    >
      <ul className="pokemon-app__list">
        { pokemons.map(( pokemon ) => (
          <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
        ))}
      </ul>
    </InfiniteScroll>
  )
}