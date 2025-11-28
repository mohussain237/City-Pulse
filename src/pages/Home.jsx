import React, { useState, useEffect } from "react";
import useEvents from "../hooks/useEvents";
import EventCard from "../components/EventCard";
import { useAppContext } from "../context/AppContext";
import { useNavigate, Link } from 'react-router-dom'

export default function Home() {
    const { results, search } = useEvents();
    const { language, setLanguage, favorites, toggleFavorite, isFavorite, user, setUser, users } = useAppContext();
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {

        search({ keyword: "", city: "" });

    }, []);

    const handleLogout = () => {
        setUser(null)
        // console.log(users)
        navigate("/login");

    }

    function handleSearch() {
        search({ keyword, city });
    }

    console.log(user)
    return (
        <div style={{ alignItems: "center", padding: 16, direction: language === "ar" ? "rtl" : "ltr" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Home</h2>
                <div>
                    <button style={{ margin: 10, padding:5 }}onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
                        {language === "en" ? "العربية" : "English"}
                    </button>
                    {user ?
                        <>
                            <span >Hi, {user.name || user.email} </span>
                            <button className="common-btn" onClick={handleLogout}>Logout</button>
                        </>
                        : <Link to="/login" className="common-btn">Login</Link>}
                </div>
            </div>

            <div className="search-bar" style={{ justifyContent: "center", display: "flex", gap: 8 }}>
                <input
                
                    style={{ display: "inline-block",  padding: 5, }}
                    placeholder={language === "en" ? "Keyword" : "كلمة البحث"}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input
                    style={{ display: "inline-block",  padding: 5, }}
                    placeholder={language === "en" ? "City" : "المدينة"}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button style={{display:"inline-block", padding:"5px 10px", backgroundColor:"#ddd" }} onClick={handleSearch}>Search</button>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {results.length === 0 && <p>No events found.</p>}
                {results.map((ev) => (
                    <EventCard
                        key={ev.id}
                        event={ev}
                        isFavorite={isFavorite}
                        toggleFavorite={toggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
}
