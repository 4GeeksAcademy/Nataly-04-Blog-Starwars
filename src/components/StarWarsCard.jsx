import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const StarWarsCard = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(
        (favorite) =>
            favorite.id === item.uid &&
            favorite.type === type
    );

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({
                type: "remove_favorite",
                payload: {
                    id: item.uid,
                    type: type
                }
            });
        } else {
            dispatch({
                type: "add_favorite",
                payload: {
                    id: item.uid,
                    type: type,
                    name: item.name
                }
            });
        }
    };

    // SWAPI utiliza "people", pero nuestra aplicación
    // utiliza "characters" para las tarjetas.
    const imageType =
        type === "characters"
            ? "people"
            : type;

    return (
        <div className="card h-100 shadow-sm">

            <img
                src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${imageType}/${item.uid}.jpg?raw=true`}
                className="card-img-top"
                alt={item.name}
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
                    {item.name}
                </h5>

                <div className="card-text">

                    {type === "characters" && (
                        <>
                            <p className="mb-1">
                                <strong>Gender:</strong>{" "}
                                {item.gender || "unknown"}
                            </p>

                            <p className="mb-1">
                                <strong>Hair:</strong>{" "}
                                {item.hair_color || "unknown"}
                            </p>

                            <p className="mb-1">
                                <strong>Eyes:</strong>{" "}
                                {item.eye_color || "unknown"}
                            </p>
                        </>
                    )}

                    {type === "planets" && (
                        <>
                            <p className="mb-1">
                                <strong>Climate:</strong>{" "}
                                {item.climate || "unknown"}
                            </p>

                            <p className="mb-1">
                                <strong>Terrain:</strong>{" "}
                                {item.terrain || "unknown"}
                            </p>

                            <p className="mb-1">
                                <strong>Population:</strong>{" "}
                                {item.population || "unknown"}
                            </p>
                        </>
                    )}

                    {type === "vehicles" && (
                        <>
                            <p className="mb-1">
                                <strong>Model:</strong>{" "}
                                {item.model || "unknown"}
                            </p>

                            <p className="mb-1">
                                <strong>Manufacturer:</strong>{" "}
                                {item.manufacturer || "unknown"}
                            </p>

                            <p className="mb-1">
                                <strong>Class:</strong>{" "}
                                {item.vehicle_class || "unknown"}
                            </p>
                        </>
                    )}

                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center">

                    <Link
                        to={`/single/${type === "characters" ? "people" : type}/${item.uid}`}
                        className="btn btn-primary"
                    >
                        Learn more
                    </Link>

                    <button
                        className={`btn ${
                            isFavorite
                                ? "btn-danger"
                                : "btn-outline-danger"
                        }`}
                        onClick={handleFavorite}
                        title={
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }
                    >
                        {isFavorite ? "♥" : "♡"}
                    </button>

                </div>

            </div>
        </div>
    );
};