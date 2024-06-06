import Link from "next/link"
import { HeartIcon, PokeballIcon } from "../components"
import { getPokemonTypes } from "@/services/pokeApi"
import Image from "next/image"

type Type = {
  type: string
  index: number
}[]

export const Header = async() => {
  const types: Type = await getPokemonTypes()
  return (
    <>
    <header className="header">
      <div className="logo">
        <Link href="/">
          <PokeballIcon height={ 32 } width={ 32 } fill="#fff" />
        </Link>
      </div>
      <div className="header__content">
        <Link href="/favorites" className="button ghost-button">
          <HeartIcon height={ 24 } width={ 24 } fill="none" />
          <span>Favorites</span>
        </Link>        
      </div>
      <div className="links"></div>
    </header>
    {/* <div className="sidebar">
      <ul className="nav">
        { types.map(( type, index ) => (
          <>
          <li key={ index }>
            <Link href={ `/type/${ type }` }>
              <Image
                src={`/images/${ type }.svg`}
                alt={ `Tipo ${ type }` }
                width={ 32 }
                height={ 32 }
              />
            </Link>
          </li>
          </>
        ))}
      </ul>
    </div> */}
  </>
  )
}
