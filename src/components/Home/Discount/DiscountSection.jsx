import bgImage from "../../../assets/images/banner-image-bg-1.jpg";
import bannerImage from "../../../assets/images/banner-image3.png";
import DiscountTimer from "./DiscountTimer";

const DiscountSection = () => {
  return (
    <section
      className="w-full h-[600px] bg-cover bg-center flex items-center justify-between px-10"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
    {/* Right Section */}

    <div className="container w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
  {/* Left Content */}
  <div className="max-w-md md:w-1/2 flex justify-center">
    <img 
      src={bannerImage} 
      alt="Banner" 
      className="w-2/3 md:w-full object-contain" 
    />
  </div>
</div>


      {/* Left Section */}
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-bold leading-tight">
          🎉 30% Discount on all items. Hurry Up !!!
        </h1>

        {/* Countdown */}

        <DiscountTimer></DiscountTimer>

        {/* Button */}
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg mt-6 transition">
          Shop Collection
        </button>
      </div>

     
    </section>
  );
};

export default DiscountSection;
