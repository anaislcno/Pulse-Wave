import { getAccessToken } from "./spotifyClient";

const getArtistData = async (artistId: any) => {
  try {
    const token = await getAccessToken(); // Assume that you have the getAccessToken function from your previous code

    const res = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    } else {
      console.error(
        `Échec de la requête pour obtenir les données de l'artiste (statut ${res.status})`
      );
      throw new Error(
        "Échec de la requête pour obtenir les données de l'artiste"
      );
    }
  } catch (error) {
    throw error;
  }
};

export { getArtistData };
