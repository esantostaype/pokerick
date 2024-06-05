'use client'
import { useEffect, useState } from 'react'
import { getPokemonsByIds } from '../services/pokeApi'
import type { SimplePokemon } from '../interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'
import { HeartIcon, HomeIcon, PokemonCard, Spinner } from '../components'
import Image from 'next/image'
import Link from 'next/link'

export const NoFavorites = () => {
  return (
    <div className="no-favorites">
      <div>
        <div className="no-favorites__image">
          <Image src="/images/open-pokeball.svg" alt="No hay Favoritos" height={ 128 } width={ 128 } />
        </div>
        <h1 className="no-favorites__title">
          <HeartIcon height={ 48 } width={ 48 } fill="none" stroke="var(--primary-theme)" />
          <span>No hay favoritos</span>
        </h1>
        <p className="no-favorites__caption">Aun no has marcado ningún Pokémon como favorito :)</p>
        <div className='not-found__button'>
            <Link href='/' className="button ghost-button">
                <HomeIcon height={ 24 } width={ 24 } fill="var(--primary-theme)"/>
                <span>Regresar al Home</span>
            </Link>
        </div>
      </div>
    </div>
  )
}

export const FavoritePokemonGrid = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<SimplePokemon[]>([])
  const [favoriteIds, setFavoriteIds] = useState<number[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const storedFavoriteIds = JSON.parse(localStorage.getItem('favoriteIds') || '[]')
    setFavoriteIds(storedFavoriteIds)
  }, [])

  useEffect(() => {
    if ( favoriteIds.length > 0 ) {
      fetchMorePokemons()
    }
  }, [ favoriteIds ])

  const fetchMorePokemons = async () => {
    const itemsPerPage = 10
    const startIndex = page * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const idsToFetch = favoriteIds.slice(startIndex, endIndex)
    const pokemons = await getPokemonsByIds(idsToFetch)

    setFavoritePokemons((prevPokemons) => [...prevPokemons, ...pokemons])
    setPage(page + 1)

    if (endIndex >= favoriteIds.length) {
      setHasMore(false)
    }
  }

  return (
    <>
    {
      favoritePokemons.length === 0
      ? <NoFavorites/>
      : <InfiniteScroll
        dataLength={ favoritePokemons.length }
        style={{ width: '100%', overflow: 'initial' }}
        next={ fetchMorePokemons }
        hasMore={ hasMore }
        loader={ <div className='infiniteLoading'><Spinner/></div> }
        endMessage={ <p className='infiniteFinalText'>Yay! You have seen it all :)</p> }
      >
        <ul className="pokemon-app__list">
          { favoritePokemons.map(( pokemon ) => (
            <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
          ))}
        </ul>
      </InfiniteScroll>
    }
    </>    
  )
}
