
import useLocalStorage from "./useLocalStorage";

export default function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage("cp_favorites", []);  //  favorites stored as array of event objects in localStorage key "cp_favorites"

  const toggleFavorite = (event) => {
    const exists = favorites.find((f) => f.id === event.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== event.id));
    } else {
      setFavorites([event, ...favorites]);
    }
  };

  const isFavorite = (eventId) => favorites.some((f) => f.id === eventId);

  return { favorites, toggleFavorite, isFavorite };
}
