import { browseCategories, getAccessToken } from "@/lib/spotifyClient";
import { getArtistData } from "@/lib/spotifyArtist";
import GenresList from "./components/Genres/Genres";

export default async function Home() {
  await getAccessToken();
  await browseCategories();

  try {
    const artistId = "1kDGbuxWknIKx4FlgWxiSp"; // ID de l'artiste souhaité
    const artistData = await getArtistData(artistId);
    console.log(artistData); // Affiche les données de l'artiste
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <GenresList />
    </main>
  );
}
