'use client'
import Link from 'next/link'
import Image from 'next/image'
import { PokemonImage, FavoriteButton } from '@/components'
import { SimplePokemon } from '@/interfaces'
import { Tilt } from 'react-tilt'

interface Props {
    pokemon: SimplePokemon
}

export function PokemonCard({ pokemon } : Props ) {

	return (
		<li className={`pokemon-app__item fadeIn ${pokemon.types[0].type.name}`}>
		<Tilt style={{ transformStyle: "preserve-3d" }}>
			<div className="pokemon-app__item__content">
				{/* <FavoriteButton pokemonId={ +pokemon.id } className="button icon-button pokemon-app__item__like" /> */}
				<Link href={ `/pokemon/${ pokemon.name }` } className="pokemon-app__item__link">
					<div className="pokemon-app__item__image">
						<PokemonImage id={ pokemon.id } name={ pokemon.name } width={ 200 } height={ 200 } />
					</div>
					<div className="pokemon-app__item__caption">
						<h2 className="pokemon-app__item__title">{ pokemon.name }</h2>
						<ul className="pokemon-app__item__types">
							{ pokemon.types.map( ( typeObject : any ) => {
								return (
									<li className="pokemon-app__item__types__item" key={ typeObject.slot }>
										<Image
											src={`/images/${ typeObject.type.name }.svg`}
											alt={ typeObject.type.name }
											width={ 24 }
											height={ 24 }
										/>
										<span>{ typeObject.type.name }</span>
									</li>
								)
							})}
						</ul>
						<div className="pokemon-app__item__info">
							<div className="pokemon-app__item__info__item">
								<span>Height</span>
								<span className="pokemon-app__item__info__value">{ pokemon.height! / 10 } M</span>
							</div>
							<div className="pokemon-app__item__info__item">
								<span>Weight</span>
								<span className="pokemon-app__item__info__value">{ pokemon.weight! / 10 } KG</span>
							</div>
						</div>
					</div>
				</Link>
			</div>
			</Tilt>
		</li>
	)
}