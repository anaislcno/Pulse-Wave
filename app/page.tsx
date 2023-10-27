import prismaClient from '@/lib/prisma'
import { browseCategories, getAccessToken } from '@/lib/spotifyClient'
import Image from 'next/image'

export default async function Home() {
  await getAccessToken()
  await browseCategories()

  return <main>coucou</main>
}
