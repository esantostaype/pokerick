'use client'
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/navigation';

type Props = {
  page: number
  totalPages: number
  link?: string
}

export const MaterialPagination = ({ page, totalPages, link }: Props ) => {

  const router = useRouter()

  const handleChange = ( event: React.ChangeEvent<unknown>, value: number ) => {
    if( value === 1 ){
      router.push(`${ link }`)
    }
    router.push(`${ link }?page=${ value }`)
  }

  return (
    <>
    { totalPages > 1 && (
        <Pagination 
          count={ totalPages } 
          page={ page } 
          onChange={ handleChange }
          showFirstButton showLastButton
        />
      )}
    </>
  )
}