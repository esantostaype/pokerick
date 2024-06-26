import type { FullPokemon, SimplePokemon } from '../interfaces'
import type { Ability, Move } from '../interfaces/full-pokemon'

export const getPokemons = async ( limit = 20, offset = 0 ) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
	const pokemonData = await response.json()

	const pokemons = await Promise.all(
		pokemonData.results.map(async (initialPokemon: { url: RequestInfo | URL }) => {
			const pokemonResponse = await fetch(initialPokemon.url)
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

	return { pokemonData, pokemons }
}

export const getPokemonsByFilters= async (query: string, type?: string): Promise<SimplePokemon[]> => {
  let response;
  if (type) {
    response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await response.json();
    const filteredPokemons = data.pokemon.filter((pokemonEntry: { pokemon: { name: string } }) =>
      pokemonEntry.pokemon.name.includes(query.toLowerCase())
    );

    const pokemons = await Promise.all(
      filteredPokemons.map(async (initialPokemon: { pokemon: { url: RequestInfo | URL } }) => {
        const pokemonResponse = await fetch(initialPokemon.pokemon.url);
        const pokemon = await pokemonResponse.json();

        const simplePokemon: SimplePokemon = {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight
        };

        return simplePokemon;
      })
    );

    return pokemons;
  } else {
    response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
    const data = await response.json();

    const filteredPokemons = data.results.filter((pokemon: { name: string }) =>
      pokemon.name.includes(query.toLowerCase())
    );

    const pokemons = await Promise.all(
      filteredPokemons.map(async (initialPokemon: { url: RequestInfo | URL }) => {
        const pokemonResponse = await fetch(initialPokemon.url);
        const pokemon = await pokemonResponse.json();

        const simplePokemon: SimplePokemon = {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types,
          height: pokemon.height,
          weight: pokemon.weight
        };

        return simplePokemon;
      })
    );

    return pokemons;
  }
};

export const getPokemonsByType = async ( type: string ) => {
	const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
	const pokemonData = await response.json()

	const pokemons = await Promise.all(
		pokemonData.pokemon.map(async ( initialPokemon: any ) => {
			const pokemonResponse = await fetch( initialPokemon.pokemon.url )
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

	const typeName = pokemonData.name

	return { typeName, pokemons }
}

export interface PokemonType {
  name: string
  url: string
}

export const getPokemonTypes = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/type?offset=0&limit=18`)
  const typesData = await response.json()  
  const typeNames = typesData.results.map( (type: { name: any }) => type.name )
  return typeNames
}

export const getPokemonBy = async ( name: string ) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
	const pokemonData: FullPokemon = await response.json()

	const abilities = await Promise.all(
		pokemonData.abilities.map(async (ability: Ability) => {
			const abilityResponse = await fetch(ability.ability.url)
			const abilities: Ability = await abilityResponse.json()
			return abilities
		})
	)

	const moves = await Promise.all(
		pokemonData.moves.map(async (move: Move) => {
			const moveResponse = await fetch(move.move.url)
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
		ids.map( async ( id: number ) => {
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

export const getPokemon = async ( name: string ): Promise<FullPokemon> => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ name }`)

	const pokemonData: FullPokemon = await response.json()

	const abilities = await Promise.all(
		pokemonData.abilities.map(async (ability: Ability) => {
			const abilityResponse = await fetch(ability.ability.url)
			const abilities: Ability = await abilityResponse.json()
			return abilities
		})
	)

	const moves = await Promise.all(
		pokemonData.moves.map(async (move: Move) => {
			const moveResponse = await fetch(move.move.url)
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