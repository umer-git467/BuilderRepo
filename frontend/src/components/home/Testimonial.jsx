import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

const Testimonial = () => {
  const Data = [
    {
      id: 1,
      name: "John Doe",
      content:
        " adipiscing elit. Nullam justo nisl, aliquet ut ex ac, tristique convallis mi.Vivamus eleifend fringilla dui ut aliquam. Integer euismod ex id feugiat tincidunt.",
      img: "https://img.freepik.com/free-photo/happy-satisfied-customer-making-like-gesture_74855-3529.jpg?size=626&ext=jpg&ga=GA1.1.2047313287.1699082971&semt=ais",
      title: "Busses Manager",
    },
    {
      id: 2,
      name: "Jane Smith",
      content:
        "Sed fringilla auctor augue sit amet gravida. Pellentesque eu fringilla nisi, vel tempus leo.Vivamus eleifend fringilla dui ut aliquam. Integer euismod ex id feugiat tincidunt.",
      img: "https://img.freepik.com/free-photo/elegant-businessman-office_155003-12612.jpg?size=626&ext=jpg&ga=GA1.1.2047313287.1699082971&semt=ais",
      title: "Busses Manager",
    },
    {
      id: 3,
      name: "Mike Johnson",
      content:
        "Vivamus eleifend fringilla dui ut aliquam. Integer euismod ex id feugiat tincidunt.Vivamus eleifend fringilla dui ut aliquam. Integer euismod ex id feugiat tincidunt.",
      img: "https://img.freepik.com/free-photo/middle-age-man-with-grey-hair-dark-color-shirt-holding-smartphone-showing-thumb-up-looking-camera-happy-cheerful-smiling-standing-blue-background_141793-133926.jpg?size=626&ext=jpg&ga=GA1.1.2047313287.1699082971&semt=ais",
      title: "Busses Manager",
    },
    {
      id: 4,
      name: "Mike Johnson",
      content:
        "Vivamus eleifend fringilla dui ut aliquam. Integer euismod ex id feugiat tincidunt.Vivamus eleifend fringilla dui ut aliquam. Integer euismod ex id feugiat tincidunt.",
      img: "/assets/images/man.jpg",
      title: "Busses Manager",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section id="aboutus"  className="bg-[#1B293B] py-10">
        <div className="heading text-center py-20 w-2/3 mx-auto">
          <h4 className="text-[#33a9ff] my-10">TESTIMONIAL</h4>
          <h1 className="text-4xl text-white font-bold">
            What they say about us
          </h1>
        </div>
        {/* <TestimonialSlider /> */}
        <div className="container mx-auto">
          <Slider {...settings}>
            {Data.map((d) => (
              <div key={d.id} className="bg-[#435D78] text-black rounded-xl ">
                <div className="rounded-full flex w-20 h-20 mx-auto justify-center items-center my-5">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="rounded-full h-full w-full"
                  />
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-6">
                  <p className="text-center text-white font-semibold">
                    {d.content}
                  </p>
                  <p className="text-xl font-semibold text-[#33a9ff]">
                    {d.name}
                  </p>
                  <p className="text-gray-800">{d.title}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
