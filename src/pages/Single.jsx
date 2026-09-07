import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = "https://www.swapi.tech/api";

export const Single = () => {
    const { type, id } = useParams();

    const [properties, setProperties] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getItem = async () => {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch(
                    `${API_URL}/${type}/${id}`
                );

                if (!response.ok) {
                    throw new Error("Resource not found");
                }

                const data = await response.json();

                if (!data.result || !data.result.properties) {
                    throw new Error("Invalid API response");
                }

                setProperties(data.result.properties);

            } catch (error) {
                console.error(
                    "Error loading details:",
                    error
                );

                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getItem();
    }, [type, id]);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3">
                    Loading Star Wars information...
                </p>
            </div>
        );
    }

    if (error || !properties) {
        return (
            <div className="container py-5 text-center">
                <h2>Information not found</h2>

                <Link
                    to="/"
                    className="btn btn-primary mt-3"
                >
                    ← Back to home
                </Link>
            </div>
        );
    }

    const imageType =
        type === "people"
            ? "people"
            : type;

    const readableType =
        type === "people"
            ? "Character"
            : type === "planets"
                ? "Planet"
                : "Vehicle";

    const visibleProperties = Object.entries(
        properties
    ).filter(
        ([key, value]) =>
            key !== "url" &&
            !Array.isArray(value) &&
            typeof value !== "object"
    );

    return (
        <div className="container py-5">

            <Link
                to="/"
                className="btn btn-outline-secondary mb-4"
            >
                ← Back to home
            </Link>

            <div className="card shadow-lg border-0 overflow-hidden">

                <div className="row g-0">

                    {/* IMAGE */}
                    <div className="col-md-5">
                        <img
                            src={`https://github.com/breatheco-de/swapi-images/blob/master/public/images/${imageType}/${id}.jpg?raw=true`}
                            className="img-fluid w-100 h-100"
                            alt={properties.name}
                            style={{
                                minHeight: "500px",
                                objectFit: "cover"
                            }}
                            onError={(event) => {
                                event.target.src =
                                    "https://placehold.co/600x800?text=Star+Wars";
                            }}
                        />
                    </div>

                    {/* INFORMATION */}
                    <div className="col-md-7">

                        <div className="card-body p-4 p-lg-5">

                            <span className="badge bg-warning text-dark mb-3">
                                {readableType}
                            </span>

                            <h1 className="display-5 fw-bold mb-3">
                                {properties.name}
                            </h1>

                            <p className="text-muted mb-4">
                                Detailed information about{" "}
                                {properties.name}.
                            </p>

                            <hr />

                            <div className="row mt-4">

                                {visibleProperties.map(
                                    ([key, value]) => (
                                        <div
                                            className="col-md-6 mb-4"
                                            key={key}
                                        >
                                            <small className="text-uppercase text-muted fw-bold">
                                                {key.replaceAll(
                                                    "_",
                                                    " "
                                                )}
                                            </small>

                                            <div className="mt-1">
                                                {value || "unknown"}
                                            </div>
                                        </div>
                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};