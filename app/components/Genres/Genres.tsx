"use client";

import React, { useState, useEffect } from "react";
import { getAccessToken } from "@/lib/spotifyClient";

const GenresList = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const token = await getAccessToken();

        const res = await fetch(
          "https://api.spotify.com/v1/recommendations/available-genre-seeds",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          const data = await res.json();

          // Filtrer les genres qui commencent par "rock"
          const rockGenres = data.genres.filter((genre: string) =>
            genre.toLowerCase().startsWith("rock")
          );

          setGenres(rockGenres);
          setLoading(false);
        } else {
          // Gérer les erreurs selon le statut
          console.error(
            `Échec de la requête pour les genres (statut ${res.status})`
          );
        }
      } catch (error) {
        // Gérer les erreurs
        console.error("Erreur dans la requête pour genres :", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div>
      <h2>Test genres</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {genres.map((genre, index) => (
            <li key={index}>{genre}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenresList;
