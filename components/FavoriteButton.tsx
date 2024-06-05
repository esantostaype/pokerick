'use client'
import { HeartIcon } from "../components";
import { useFavoritePokemonStore } from "../store/pokemon-store";

interface Props {
  pokemonId: number;
  className?: string;
}

export const FavoriteButton = ({ pokemonId, className }: Props) => {
  const { favoriteIds, addFavorite, removeFavorite } = useFavoritePokemonStore();
  const isFavorite = favoriteIds.includes( pokemonId );

  const onToggle = () => {
    if (isFavorite) {
      removeFavorite( pokemonId );
    } else {
      addFavorite( pokemonId );
    }
  };

  return (
    <button className={ className } onClick={ onToggle }>
      {isFavorite ? (
        <HeartIcon
          width={24}
          height={24}
          fill="var(--primary-theme)"
          stroke="var(--primary-theme)"
        />
      ) : (
        <HeartIcon width={ 24 } height={ 24 } />
      )}
    </button>
  );
};