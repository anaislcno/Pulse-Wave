import { browseCategories, getAccessToken } from "@/lib/spotifyClient";
import { getArtistData } from "@/lib/spotifyArtist";

export default async function Home() {
  await getAccessToken();
  await browseCategories();

  try {
    const artistId = "1kDGbuxWknIKx4FlgWxiSp"; // Remplacez par l'ID de l'artiste souhaité
    const artistData = await getArtistData(artistId);
    console.log(artistData); // Affichez les données de l'artiste
  } catch (error) {
    console.error(error);
  }

  return <main>coucou</main>;
}
