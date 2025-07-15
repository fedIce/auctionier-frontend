import HomeSearch from '../components/Home/HomeSearch'
import SpecialCategories from "../components/Home/SpecialCategories";
import CategoryIcons from "../components/Home/CategoryIcons";
import ListingCardsSection from "../components/ListingCardsSection";
import { use_get } from '@/lib/functions';




const newestLots = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?sort=-createdAt`, options: { revalidate: 0 } })
const ClosingSoonLots = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?sort=-endDate`, options: { revalidate: 0 } })

export default async function Home() {
  const [newestLotsData, closingSoonLotsData] = await Promise.all([newestLots, ClosingSoonLots])
  return (
    <div className="w-full h-auto flex flex-col text-bright justify-start items-center">
      <main className="w-full h-full max-w-7xl  flex flex-col items-center pt-8">

        <div className="w-full flex justify-center max-w-4xl mt-4 lg:mt-10">
          <HomeSearch />
        </div>
        <div className='w-full flex flex-col'>
          <SpecialCategories />
          <CategoryIcons />
        </div>
        <ListingCardsSection data={newestLotsData} title='Newest Lots' />
        <ListingCardsSection data={closingSoonLotsData} title='Closing soon' />
      </main>

    </div>
  );
}
