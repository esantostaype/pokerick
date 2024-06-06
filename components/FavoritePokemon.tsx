'use client'
import { useEffect, useState } from 'react'
import { getPokemonsByIds } from '@/services/pokeApi'
import type { SimplePokemon } from '@/interfaces'
import { HeartIcon, HomeIcon, PokemonGrid, Spinner } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

export const NoFavorites = () => {
  return (
    <div className="no-favorites">
      <div>
        <div className="no-favorites__image">
          <Image src="/images/open-pokeball.svg" alt="No hay Favoritos" height={128} width={128} />
        </div>
        <h1 className="no-favorites__title">
          <HeartIcon height={48} width={48} fill="none" stroke="var(--primary-theme)" />
          <span>No hay favoritos</span>
        </h1>
        <p className="no-favorites__caption">Aun no has marcado ningún Pokémon como favorito :)</p>
        <div className='not-found__button'>
          <Link href='/' className="button ghost-button">
            <HomeIcon height={24} width={24} fill="var(--primary-theme)" />
            <span>Regresar al Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export const FavoritePokemon = () => {
  const [ favoritePokemons, setFavoritePokemons ] = useState<SimplePokemon[]>([])
  const [ loading, setLoading ] = useState( true )

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      const storedFavoriteIds = JSON.parse(localStorage.getItem( 'favoriteIds' ) || '[]' )
      const pokemons = await getPokemonsByIds( storedFavoriteIds )
      setFavoritePokemons( pokemons )
      setLoading( false )
    }

    fetchFavoritePokemons()
  }, [])

  if ( loading ) {
    return <div className='loading'><Spinner/></div>
  }

  if ( favoritePokemons.length === 0 ) {
    return <NoFavorites />
  }

  return <PokemonGrid pokemons={ favoritePokemons } />
}