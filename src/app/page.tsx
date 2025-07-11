import HomeSearch from '../components/Home/HomeSearch'
import SpecialCategories from "../components/Home/SpecialCategories";
import CategoryIcons from "../components/Home/CategoryIcons";
import ListingCardsSection from "../components/ListingCardsSection";
import { use_get } from '@/lib/functions';





export default async function Home() {
  const newestLots = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?sort=-createdAt` })
  const ClosingSoonLots = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?sort=-endDate` })
  return (
    <div className="w-full h-auto flex flex-col text-bright justify-start items-center">
      <main className="w-full h-full max-w-7xl flex flex-col items-center pt-8">

        <div className="w-full flex justify-center max-w-4xl mt-8 lg:mt-20">
          <HomeSearch />
        </div>
        <div className='w-full flex flex-col'>
          <SpecialCategories />
          <CategoryIcons />
        </div>
        <ListingCardsSection data={newestLots} title='Newest Lots'/>
        <ListingCardsSection data={ClosingSoonLots} title='Closing soon' />
        <ListingCardsSection data={null} />
      </main>

    </div>
  );
}
