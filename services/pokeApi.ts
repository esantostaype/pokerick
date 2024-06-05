import type { FullPokemon } from '../interfaces'
import type { Ability, Move } from '../interfaces/full-pokemon'

export const getPokemons = async ( limit = 20, offset = 0 ) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
	const pokemonData = await response.json()

	const pokemons = await Promise.all(
		pokemonData.results.map(async ( initialPokemon: { url: RequestInfo | URL }) => {
			const pokemonResponse = await fetch( initialPokemon.url )
			const pokemon = await pokemonResponse.json()

			const simplePokemon = {
				id: pokemon.id,
				name: pokemon.name,
				types: pokemon.types,
				height: pokemon.height,
				weight: pokemon.weight
			}

			return simplePokemon
		})
	)

	return pokemons
}

export const getPokemonBy = async ( name: string ) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
	const pokemonData: FullPokemon = await response.json()

	const abilities = await Promise.all(
		pokemonData.abilities.map(async ( ability: Ability ) => {
			const abilityResponse = await fetch( ability.ability.url )
			const abilities: Ability = await abilityResponse.json()
			return abilities
		})
	)

	const moves = await Promise.all(
		pokemonData.moves.map(async ( move: Move ) => {
			const moveResponse = await fetch( move.move.url )
			const moves: Move = await moveResponse.json()
			return moves
		})
	)

	const pokemon: FullPokemon = {
		id: pokemonData.id,
		name: pokemonData.name,
		types: pokemonData.types,
		height: pokemonData.height,
		weight: pokemonData.weight,
		stats: pokemonData.stats,
		abilities,
		moves
	}

	return pokemon
}

export const getPokemonsByIds = async ( ids: number[] ) => {
  const pokemons = await Promise.all(
    ids.map( async (id: number) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ id }`)
      const pokemonData = await response.json()

      const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        types: pokemonData.types,
        height: pokemonData.height,
        weight: pokemonData.weight
      }

      return pokemon
    })
  )

  return pokemons
}