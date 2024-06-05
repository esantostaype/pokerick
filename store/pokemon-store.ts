import { create } from 'zustand'

interface FavoritePokemonStore {
  favoriteIds: number[]
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  loadFavorites: () => void
}

export const useFavoritePokemonStore = create<FavoritePokemonStore>((set, get) => {
  const updateLocalStorage = (favoriteIds: number[]) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('favoriteIds', JSON.stringify(favoriteIds))
    }
  }

  const loadFavoritesFromLocalStorage = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedFavorites = localStorage.getItem('favoriteIds')
      return storedFavorites ? JSON.parse(storedFavorites) : []
    }
    return []
  }

  return {
    favoriteIds: loadFavoritesFromLocalStorage(),
    addFavorite: (id) => {
      const { favoriteIds } = get()
      if (!favoriteIds.includes(id)) {
        const newFavoriteIds = [...favoriteIds, id]
        set({ favoriteIds: newFavoriteIds })
        updateLocalStorage(newFavoriteIds)
      }
    },
    removeFavorite: (id) => {
      const { favoriteIds } = get()
      const newFavoriteIds = favoriteIds.filter(favId => favId !== id)
      set({ favoriteIds: newFavoriteIds })
      updateLocalStorage(newFavoriteIds)
    },
    loadFavorites: () => {
      const favoriteIds = loadFavoritesFromLocalStorage()
      set({ favoriteIds })
    }
  }
})