"use client";

import { useState, useEffect } from "react";
import "../styles/navbar.css";

function Navbar() {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");

        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const logout = (): void => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");

        window.location.href = "/login";
    };

    return (
        <nav className="navbar">
            <h2 className="logo">
                Route53 Clone
            </h2>

            <div className="nav-right">
                <span className="username">
                    Welcome, {username}
                </span>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;