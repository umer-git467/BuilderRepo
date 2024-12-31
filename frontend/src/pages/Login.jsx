import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
function Login() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       infinite: true,
    //       dots: true,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       initialSlide: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };

  return (
    <>
      <div
        id="login"
        className="bg-gradient-to-b from-blue-500 to-purple-800 h-[10vh] flex items-center"
      >
        <h3 className="text-white text-4xl px-5 font-bold">Build Hub</h3>
      </div>
      <div className="h-[85vh] roboto-regular overflow-hidden flex">
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-300 to-white">
          <h2 className="text-5xl roboto-regular mb-12 text-center text-gray-800">
            Welcome to Build Hub
          </h2>
          <div className="flex space-x-6">
            <Link
              to="/create-account"
              id="get-started-btn"
              className="rounded-full py-3 px-6 text-center text-white text-xl bg-blue-500 hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Create Account
            </Link>
            <Link
              to="/sign-in"
              className="rounded-full py-3 px-6 text-center text-xl border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 shadow-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div className="w-1/2 bg-gradient-to-tl to-white from-blue-200 h-full flex items-center justify-center">
          <Slider {...settings} className="h-4/5 w-4/5">
            <div className="h-full flex items-center justify-center">
              <img
                src="assets/images/home1.png"
                alt="Build Hub Feature 1"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="h-full flex items-center justify-center">
              <img
                src="assets/images/home2.png"
                alt="Build Hub Feature 2"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="h-full flex items-center justify-center">
              <img
                src="assets/images/home3.png"
                alt="Build Hub Feature 3"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="bg-gradient-to-b from-blue-500 to-purple-800 h-[5vh]"></div>
    </>
  );
}
// ReactDOM.render(<DemoCarousel />, document.querySelector(".demo-carousel"));

export default Login;
