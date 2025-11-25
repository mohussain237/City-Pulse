import React from "react";
import { useAppContext } from "../context/AppContext";
import EventCard from "../components/EventCard";

export default function Profile() {
  const { user, favorites, logout, language, isFavorite, toggleFavorite } = useAppContext();

  return (
    <div style={{ padding: 16, direction: language === "ar" ? "rtl" : "ltr" }}>
      <h2>{language === "en" ? "Profile" : "الملف"}</h2>

      {user ? (
        <div>
          <p><strong>{language === "en" ? "Name" : "الاسم"}:</strong> {user.name || "-"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={logout}>{language === "en" ? "Logout" : "تسجيل الخروج"}</button>
        </div>
      ) : (
        <p>Please login to view profile.</p>
      )}

      <div style={{ marginTop: 16 }}>
        <h3>{language === "en" ? "Favorites" : "المفضلة"}</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {favorites.length === 0 && <p>{language === "en" ? "No favorites yet." : "لا توجد عناصر مفضلة."}</p>}
          {favorites.map(ev => (
            <EventCard key={ev.id} event={ev} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
          ))}
        </div>
      </div>
    </div>
  );
}
