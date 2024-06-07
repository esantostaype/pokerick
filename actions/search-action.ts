'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function SearchAction( type?: string, query?: string ) {
  if ( type && query ) {
    redirect(`/?type=${type}&q=${query}`)
  } else if ( type ) {
    redirect(`/?type=${type}`)
  } else if ( query ) {
    redirect(`/?q=${query}`)
  }
}