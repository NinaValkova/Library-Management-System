import Carousel from "../components/home_page/Carousel";
import About from "../components/home_page/About";
import Stats from "../components/home_page/Stats";
import Recommendations from "../components/home_page/Recommendations";

export default function HomePage() {
  return (
    <div id="home">
      <Carousel/>
      <About/>
      <Stats />
      <Recommendations />
    </div>
  );
}