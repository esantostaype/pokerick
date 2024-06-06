'use server'

import { revalidatePath } from 'next/cache'

export async function FavoriteAction() {
  revalidatePath('/favorites')
}