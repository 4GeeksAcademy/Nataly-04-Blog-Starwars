import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { StarWarsCard } from "../components/StarWarsCard";

const API_URL = "https://www.swapi.tech/api";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDetailedItems = async (items) => {
            const detailedItems = await Promise.all(
                items.map(async (item) => {
                    const response = await fetch(item.url);

                    if (!response.ok) {
                        throw new Error(
                            `Error loading ${item.name}`
                        );
                    }

                    const data = await response.json();

                    return {
                        ...item,
                        ...data.result.properties
                    };
                })
            );

            return detailedItems;
        };

        const getData = async () => {
            try {
                setLoading(true);

                // Obtener las listas
                const [
                    peopleResponse,
                    planetsResponse,
                    vehiclesResponse
                ] = await Promise.all([
                    fetch(`${API_URL}/people/`),
                    fetch(`${API_URL}/planets/`),
                    fetch(`${API_URL}/vehicles/`)
                ]);

                if (
                    !peopleResponse.ok ||
                    !planetsResponse.ok ||
                    !vehiclesResponse.ok
                ) {
                    throw new Error("Error loading Star Wars lists");
                }

                const [
                    peopleData,
                    planetsData,
                    vehiclesData
                ] = await Promise.all([
                    peopleResponse.json(),
                    planetsResponse.json(),
                    vehiclesResponse.json()
                ]);

                // Obtener los detalles de cada elemento
                const [
                    detailedPeople,
                    detailedPlanets,
                    detailedVehicles
                ] = await Promise.all([
                    getDetailedItems(peopleData.results),
                    getDetailedItems(planetsData.results),
                    getDetailedItems(vehiclesData.results)
                ]);

                // Guardar en el store
                dispatch({
                    type: "set_people",
                    payload: detailedPeople
                });

                dispatch({
                    type: "set_planets",
                    payload: detailedPlanets
                });

                dispatch({
                    type: "set_vehicles",
                    payload: detailedVehicles
                });

            } catch (error) {
                console.error(
                    "Error loading Star Wars data:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    // Pantalla de carga
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

    return (
        <div className="container py-5">

            {/* HEADER */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">
                    Star Wars Database
                </h1>

                <p className="lead text-muted">
                    Explore characters, planets and vehicles
                </p>
            </div>

            {/* CHARACTERS */}
            <section className="mb-5">
                <h2 className="mb-4 border-bottom pb-2">
                    Characters
                </h2>

                <div className="row">
                    {store.people.map((person) => (
                        <div
                            className="col-md-4 col-lg-3 mb-4"
                            key={person.uid}
                        >
                            <StarWarsCard
                                item={person}
                                type="characters"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* PLANETS */}
            <section className="mb-5">
                <h2 className="mb-4 border-bottom pb-2">
                    Planets
                </h2>

                <div className="row">
                    {store.planets.map((planet) => (
                        <div
                            className="col-md-4 col-lg-3 mb-4"
                            key={planet.uid}
                        >
                            <StarWarsCard
                                item={planet}
                                type="planets"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* VEHICLES */}
            <section className="mb-5">
                <h2 className="mb-4 border-bottom pb-2">
                    Vehicles
                </h2>

                <div className="row">
                    {store.vehicles.map((vehicle) => (
                        <div
                            className="col-md-4 col-lg-3 mb-4"
                            key={vehicle.uid}
                        >
                            <StarWarsCard
                                item={vehicle}
                                type="vehicles"
                            />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};