import HomeSearch from '../components/Home/HomeSearch'
import SpecialCategories from "../components/Home/SpecialCategories";
import CategoryIcons from "../components/Home/CategoryIcons";
import ListingCardsSection from "../components/ListingCardsSection";

export default function Home() {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-center">
      <main className="w-full h-full max-w-7xl flex flex-col items-center pt-8">

        <div className="w-full flex justify-center max-w-4xl mt-8 lg:mt-20">
          <HomeSearch />
        </div>
        <div className='w-full flex flex-col'>
          <SpecialCategories />
          <CategoryIcons />
        </div>
        <ListingCardsSection />
        <ListingCardsSection />
        <ListingCardsSection />
      </main>
  
    </div>
  );
}
