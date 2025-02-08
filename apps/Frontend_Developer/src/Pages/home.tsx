import { HeroSection } from '../Components/heroSection';
import { NavBar } from '../Components/navbar';
import Category from '../Modules/Body/categoryBody';
import FoodItem from '../Modules/Body/items';

export function Home() {
  return (
    <>
      <NavBar />
      <div className="mx-4">
        {/* <h1>hello I am home page</h1>
        <h1>hello I am home page</h1>
        <NavBar /> */}
        <HeroSection />
        <Category />
        <FoodItem/>
      </div>
    </>
  );
}
