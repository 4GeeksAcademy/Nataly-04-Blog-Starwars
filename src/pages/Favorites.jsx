import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();

    const removeFavorite = (favorite) => {
        dispatch({
            type: "remove_favorite",
            payload: {
                id: favorite.id,
                type: favorite.type
            }
        });
    };

    const getImageType = (type) => {
        if (type === "characters") {
            return "people";
        }

        return type;
    };

    const getRouteType = (type) => {
        if (type === "characters") {
            return "people";
        }

        return type;
    };

    return (
        <div className="container py-5">

            <h1 className="mb-4">
                My Favorites ❤️
            </h1>

            {store.favorites.length === 0 ? (
                <div className="alert alert-info">
                    You don't have any favorites yet.
                </div>
            ) : (
                <div className="row">

                    {store.favorites.map((favorite) => (

                        <div
                            className="col-md-4 col-lg-3 mb-4"
                            key={`${favorite.type}-${favorite.id}`}
                        >

                            <div className="card h-100 shadow-sm">

                                <img
                                    src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${getImageType(favorite.type)}/${favorite.id}.jpg?raw=true`}
                                    className="card-img-top"
                                    alt={favorite.name}
                                    style={{
                                        height: "250px",
                                        objectFit: "cover"
                                    }}
                                    onError={(event) => {
                                        event.target.src =
                                            "https://placehold.co/400x250?text=Star+Wars";
                                    }}
                                />

                                <div className="card-body d-flex flex-column">

                                    <h5 className="card-title">
                                        {favorite.name}
                                    </h5>

                                    <p className="card-text text-capitalize">
                                        {favorite.type}
                                    </p>

                                    <div className="mt-auto d-flex justify-content-between align-items-center">

                                        <Link
                                            to={`/single/${getRouteType(favorite.type)}/${favorite.id}`}
                                            className="btn btn-primary"
                                        >
                                            Learn more
                                        </Link>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                removeFavorite(favorite)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};