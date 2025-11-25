
import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { events as allEvents } from "../data/events";


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // language: "en" | "ar"
  const [language, setLanguage] = useLocalStorage("cp_language", "en");

  // auth: user object or null
  const [user, setUser] = useLocalStorage("cp_user", null);

  // store registered users (for mock signup)
  const [users, setUsers] = useLocalStorage("cp_users", []);

  // favorites: array of event objects
  const [favorites, setFavorites] = useLocalStorage("cp_favorites", []);

  // Auth actions (mock)
  const signup = ({ name, email, password }) => {
    if (!email || !password) return { success: false, message: "Email & password required" };

    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, message: "User already exists" };

    const newUser = { id: Date.now().toString(), name, email, password };
    setUsers([...users, newUser]);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { success: true };
  };

  const login = ({ email, password }) => {
    if (!email || !password) return { success: false, message: "Email & password required" };

    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, message: "Invalid credentials" };

    setUser({ id: found.id, name: found.name, email: found.email });
    return { success: true };
  };

  const logout = () => setUser(null);

  // Favorites actions
  const toggleFavorite = (event) => {
    const exists = favorites.find(f => f.id === event.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== event.id));
    } else {
      setFavorites([event, ...favorites]);
    }
  };

  const isFavorite = (eventId) => favorites.some(f => f.id === eventId);

  // Simple helper to get event by id (from local data)
  const getEventById = (id) => {
    return allEvents.find(e => e.id === id) || null;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        user,
        signup,
        login,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        getEventById,
        setUser,
        users
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
