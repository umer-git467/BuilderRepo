import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import React from 'react'

const Compaines = () => {
    const Data = [
        {
            id: 1,
            img: '/assets/images/decyber.png',
        },
        {
            id: 2,
            img: '/assets/images/3Dstudioz.png',
        },
        {
            id: 3,
            img: '/assets/images/bakebun.png',
        },
        {
            id: 4,
            img: '/assets/images/busima.png',
        },
        {
            id: 5,
            img: '/assets/images/ceramiza.png',
        },
        {
            id: 6,
            img: '/assets/images/cleanie.png',
        },
        {
            id: 7,
            img: '/assets/images/eduversita.png',
        },
        {
            id: 8,
            img: '/assets/images/conztrukta.png',
        },
        {
            id: 9,
            img: '/assets/images/clicknbuy.png',
        },

    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <section className='bg-[#1B293B]'>
                <div className="mx-10 py-20">
                    <Slider {...settings}>
                        {Data.map(d => (
                            <div key={d.id} className='text-black rounded-xl'>
                                <div className='rounded-full flex mx-auto justify-center items-center my-2'>
                                    <img className="" width={150} src={d.img} alt={d.img} ></img>

                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </>
    )
}

export default Compaines