require("dotenv").config();

const spotifyCredentials = {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

let access_token: string | null = null;

const getAccessToken = async () => {
  if (access_token) {
    // Vérifie si un jeton valide existe déjà
    return access_token;
  }

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const { client_id, client_secret } = spotifyCredentials;
  const buffer = new Buffer(`${client_id}:${client_secret}`);
  const token = buffer.toString("base64");

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${token}`,
      },
      body: params,
    });

    if (res.status === 200) {
      const data = await res.json();
      access_token = data.access_token;
      return access_token;
    } else {
      // Gérer les erreurs
      throw new Error(
        `Échec de la requête pour obtenir un jeton d'accès (status ${res.status})`
      );
    }
  } catch (error) {
    // Gérer erreurs réseau
    console.error("Erreur lors de la demande de jeton d'accès :", error);
    throw error;
  }
};

const browseCategories = async () => {
  try {
    const token = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/browse/categories", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      console.log(res.status);
      return data;
    } else {
      // Gérer erreurs selon status
      console.error(
        `Échec de la requête pour parcourir les catégories (status ${res.status})`
      );
      throw new Error("Échec de la requête pour parcourir les catégories");
    }
  } catch (error) {
    throw error;
  }
};

export { getAccessToken, browseCategories };
