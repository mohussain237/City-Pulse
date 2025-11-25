import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function EventDetails() {
  const { id } = useParams();
  const { getEventById, toggleFavorite, isFavorite, language } = useAppContext();
  const event = getEventById(id);

  if (!event) return (
    <div style={{ padding: 16 }}>
      <p>Event not found.</p>
      <Link to="/home">Back to home</Link>
    </div>
  );

  // OpenStreetMap embed (no API key) — using lat/lng
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${event.lng - 0.02}%2C${event.lat - 0.02}%2C${event.lng + 0.02}%2C${event.lat + 0.02}&layer=mapnik&marker=${event.lat}%2C${event.lng}`;

  return (
    <div style={{ padding: 16, direction: language === "ar" ? "rtl" : "ltr" }}>
      <Link to="/home">← {language === "en" ? "Back" : "عودة"}</Link>

      <div style={{ marginTop: 12, display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <img src={event.image} alt={event.title} style={{ width: "100%", borderRadius: 8 }} />
          <h2 style={{ marginTop: 8 }}>{event.title}</h2>
          <p>{event.venue} • {event.city}</p>
          <p>{event.date}</p>
          <p>{event.description}</p>

          <div style={{ marginTop: 8 }}>
            <button onClick={() => toggleFavorite(event)}>
              {isFavorite(event.id) ? (language === "en" ? "Remove Favorite" : "إزالة من المفضلة") : (language === "en" ? "Add Favorite" : "أضف للمفضلة")}
            </button>
          </div>
        </div>

        <div style={{ width: 420 }}>
          <h4>{language === "en" ? "Map preview" : "معاينة الخريطة"}</h4>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #ddd" }}>
            <iframe
              title="map"
              src={mapSrc}
              style={{ width: "100%", height: 320, border: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
