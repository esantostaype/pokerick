import Link from 'next/link'
import styles from './Pagination.module.css'

type Props = {
  page: number
  totalPages: number
  link?: string
}

export const Pagination = ({ page, totalPages, link }: Props ) => {

  const pages = Array.from({ length: totalPages }, ( _, i ) => i + 1 )
  const isFirstPage = + page === 1 || page == null
  const isLastPage = + page === totalPages

  return (
    <>
    { totalPages !== 1 && 
      <nav className={ styles.pagination }>
        <ul className={ styles.pagination__list }>
          {
            isFirstPage ? (
              <li className="disabled">
                <Link href=""><i className="fi fi-rr-angle-left"></i></Link>
              </li>
            ) : (
              <li>
                <Link href={`${ link }?page=${ + page && + page - 1 }`}><i className="fi fi-rr-angle-left"></i></Link>
              </li>
            )
          }

          {
            pages.map( page => (            
              <li className={ page === + page || ( page === 1 && page === undefined ) ? 'active' : '' } key={ page } >
                <Link href={ `${ link }?page=${ page }`}>{ page }</Link>
              </li>
            ))
          }
          
          <li className={ isLastPage ? 'disabled' : '' }>
            <Link href={`${ link }?page=${ + page + 1 }`}><i className="fi fi-rr-angle-right"></i></Link>
          </li>
        </ul>
      </nav>
    }
    </>
  )
}