import { HeroSection } from '../Components/heroSection';
import { NavBar } from '../Components/navbar';

export function Home() {
  return (
    <>
      <NavBar />
      <div className="mx-4 bg-purple-500">
        {/* <h1>hello I am home page</h1>
        <h1>hello I am home page</h1>
        <NavBar /> */}
        <HeroSection />
      </div>
    </>
  );
}
