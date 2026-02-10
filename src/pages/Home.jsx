import HeroCarousel from '../components/Home/Carousel/HeroCarousel';
import Features from '../components/Home/Features';
import Products from '../components/Products/Products';
import DiscountSection from '../components/Home/Discount/DiscountSection';
import Category from '../components/Home/Categories/Category';

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Category />
      <Products />
      <DiscountSection />
    </div>
  );
};

export default Home;
