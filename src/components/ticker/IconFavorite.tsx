import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';

interface Props {
  symbol: string;
}

const IconFavorite = ({ symbol }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favoritesItem = localStorage.getItem('favorites') || '[]';
    const favorites: string[] = JSON.parse(favoritesItem);
    if (favorites.includes(symbol)) {
      setIsFavorite(true);
    }
  }, [symbol]);

  useEffect(() => {
    const favoritesItem = localStorage.getItem('favorites') || '[]';
    const favorites: string[] = JSON.parse(favoritesItem);
    if (isFavorite) {
      const favoriteSet = [...new Set([...favorites, symbol])];
      localStorage.setItem('favorites', JSON.stringify(favoriteSet));
    } else {
      const filteredFavorites = favorites.filter((favoriteSymbol) => favoriteSymbol !== symbol);
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
    }
  }, [isFavorite, symbol]);

  return (
    <i
      className={`${
        isFavorite ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-300 dark:text-gray-500'
      } cursor-pointer fa-solid fa-star w-[15px] h-[15px]`}
      onClick={handleClick}
    />
  );
};

export default IconFavorite;
