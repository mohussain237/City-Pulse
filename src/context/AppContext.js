import React, { createContext, useContext, useEffect, useState } from "react";
import { events as allEvents } from "../data/events";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 🔥 LANGUAGE (stored globally for all users)
  const [language, setLanguage] = useState(
    () => localStorage.getItem("cp_language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("cp_language", language);
  }, [language]);

  // 🔥 AUTHENTICATION
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("cp_user")) || null
  );

  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("cp_users")) || []
  );

  useEffect(() => {
    localStorage.setItem("cp_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("cp_users", JSON.stringify(users));
  }, [users]);

  // 🔥 FAVORITES (Loaded dynamically based on user)
  const [favorites, setFavorites] = useState([]);

  // Load correct favorite list when user logs in/out
  useEffect(() => {
    const key = user ? `cp_favorites_${user.id}` : "cp_favorites_guest";

    const saved = JSON.parse(localStorage.getItem(key)) || [];

    console.log("====================================");
    console.log("🔄 FAVORITES RELOADED");
    console.log("👤 Current User:", user ? user.email : "Guest");
    console.log("🗄 Storage Key Used:", key);
    console.log("⭐ Loaded Favorites:", saved);
    console.log("====================================");

    setFavorites(saved);
  }, [user]);

  // ⭐ SIGNUP
  const signup = ({ name, email, password }) => {
    if (!email || !password)
      return { success: false, message: "Email & password required" };

    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "User already exists" };

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Auto-login after signup
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });

    console.log("🎉 New User Created:", newUser);

    return { success: true };
  };

  // ⭐ LOGIN
  const login = ({ email, password }) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      console.log("❌ LOGIN FAILED for:", email);
      return { success: false, message: "Invalid credentials" };
    }

    setUser({ id: found.id, name: found.name, email: found.email });

    console.log("✅ LOGIN SUCCESS:", found.email);

    return { success: true };
  };

  // ⭐ LOGOUT
  const logout = () => {
    console.log("🚪 USER LOGGED OUT:", user?.email);
    setUser(null);
  };

  // ⭐ FAVORITE TOGGLE (user-based or guest-based)
  const toggleFavorite = (event) => {
    const key = user ? `cp_favorites_${user.id}` : "cp_favorites_guest";

    const exists = favorites.some((f) => f.id === event.id);

    const updated = exists
      ? favorites.filter((f) => f.id !== event.id)
      : [event, ...favorites];

    console.log("====================================");
    console.log("⭐ FAVORITE TOGGLED");
    console.log("👤 User:", user ? user.email : "Guest");
    console.log("🗄 Storage Key:", key);
    console.log("📌 Event:", event.title);
    console.log("🆕 Updated List:", updated);
    console.log("====================================");

    setFavorites(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const isFavorite = (eventId) => favorites.some((f) => f.id === eventId);

  // ⭐ Get single event details
  const getEventById = (id) => allEvents.find((e) => e.id === id) || null;

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
        users,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
