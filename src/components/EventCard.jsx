
import React from "react";
import { Link } from "react-router-dom";

function EventCard({ event, isFavorite, toggleFavorite }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-img" />

      <div className="event-body">
        <h3>{event.title}</h3>
        <p>{event.city} • {event.date}</p>

        <button
          className="fav-btn"
          onClick={() => {
            toggleFavorite(event)
           console.log("Toggledclicked", event)
          }}
        >
          {isFavorite(event.id) ? "★ Remove Favorite" : "☆ Add Favorite"}
        </button>

        <Link className="details-btn" to={`/event/${event.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
