import Link from "next/link"
import { HeartIcon, PokeballIcon, SearchFormFormik } from "@/components"

export const Header = async() => {
  return (
    <>
    <header className="header">
      <div className="logo">
        <Link href="/">
          <PokeballIcon height={ 32 } width={ 32 } fill="#fff" />
        </Link>
      </div>
      <div className="header__content">
        {/* <Link href="/favorites" className="button ghost-button">
          <HeartIcon height={ 24 } width={ 24 } fill="none" />
          <span>Favorites</span>
        </Link> */}
        <SearchFormFormik />
      </div>
      <div className="links"></div>
    </header>
  </>
  )
}
