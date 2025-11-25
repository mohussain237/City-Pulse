
import { useState } from "react";
import { events as allEvents } from "../data/events";


//   Simple events hook: provides search by keyword and city,
//   returns results and a search function.

export default function useEvents() {
  const [results, setResults] = useState(allEvents);

  const search = ({ keyword = "", city = "" } = {}) => {
    const k = (keyword || "").trim().toLowerCase();
    const c = (city || "").trim().toLowerCase();

    const filtered = allEvents.filter((e) => {
      const inKeyword =
        !k ||
        e.title.toLowerCase().includes(k) ||
        (e.description && e.description.toLowerCase().includes(k)) ||
        (e.venue && e.venue.toLowerCase().includes(k));
      const inCity = !c || e.city.toLowerCase().includes(c);
      return inKeyword && inCity;
    });

    setResults(filtered);
  };

  return { results, search };
}
