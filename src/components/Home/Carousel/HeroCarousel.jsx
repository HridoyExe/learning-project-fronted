
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Carousel from './Carousel';
import book from "../../../assets/images/book.png"
import fashion from "../../../assets/images/fashion.png"
import technology from "../../../assets/images/technology.png"

const HeroCarousel =()=>{

    const sliders =[
        {
            title : "This Fine Print Book  Collections",
            subtitle : "Discount Availabe.Grab it Now!",
            image : book,
        },
         {
            title : "Exculusive Fashion Collections",
            subtitle : "A specialists lable  creating  luxury  essential",
            image : fashion,
        },
         {
            title : "Your digital World. Connected",
            subtitle : "Explore a range of device for seamless living",
            image : technology,
        }
    ]
  return (
    <>
      <Swiper
        
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        
        {sliders.map((slide, index)=>(
            <SwiperSlide key={index}><Carousel title={slide.title} subtitle={slide.subtitle} image={slide.image}></Carousel></SwiperSlide>
        ))}
        
      </Swiper>
    </>
  );
}
export default HeroCarousel