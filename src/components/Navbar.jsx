import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store } = useGlobalReducer();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">

                <Link to="/" className="navbar-brand fw-bold">
                    ⭐ STAR WARS
                </Link>

                <div className="d-flex align-items-center gap-2">

                    <Link
                        to="/"
                        className="btn btn-outline-light"
                    >
                        Home
                    </Link>

                    <Link
                        to="/favorites"
                        className="btn btn-warning"
                    >
                        ❤️ Favorites
                        <span className="badge bg-dark ms-2">
                            {store.favorites.length}
                        </span>
                    </Link>

                </div>

            </div>
        </nav>
    );
};