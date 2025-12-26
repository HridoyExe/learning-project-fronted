
import bgImg from "../../../assets/images/banner-image-bg.jpg"
const Carousel = ({title, subtitle, image}) => {
    return (
        <section className=" w-full h-[650] bg-cover  bg-center flex justify-center px-4 md:px-8 items-center "style={{backgroundImage:`url(${bgImg})`}}>
        <div className=" max-w-6xl flex flex-col md:flex-row items-center justify-between px-4 md:px-8" >
            {/* Left Content  */}
            <div  className=" w-full  md:w-1/2 text-center md:text-left mb-8 md:mb-0 ">
                <h1 className=" md:text-5xl text-4xl text-gray-900 font-bold"> {title} </h1>
                <p className="text-gray-600 my-5"> {subtitle}</p>
                <button className="btn btn-secondary rounded-full shadow-md">Shop Collection </button>
            </div>

            {/* Right Image  */}
            <div className=" w-full md:w-1/2 flex justify-center">
                <img className=" max-w-full md:max-w-md  drop-shadow-lg" src={image} alt="" />
            </div>
        </div>
        </section>
    );
};

export default Carousel;