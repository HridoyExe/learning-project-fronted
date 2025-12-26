import HeroCarousel from '../components/Home/Carousel/HeroCarousel';
import Carousel from '../components/Home/Carousel/Carousel';
import Features from '../components/Home/Features';
import Products from '../components/Products/Products';

import DiscountSection  from '../components/Home/Discount/DiscountSection'
import Category from '../components/Home/Categories/Category'
const Home = () => {
    return (
        <div>
          <HeroCarousel></HeroCarousel>
          <Features></Features>
          <Category></Category>
          <Products></Products>
          <DiscountSection/>
         
        </div>
    );
};

export default Home;