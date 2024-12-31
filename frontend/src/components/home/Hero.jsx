import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="container absolute top-28 left-28 xl:py-10">
        <div className="grid lg:grid-cols-2 mx-auto ">
          <div className="flex-col xl:mt-24 px-5 lg:w-2/2 md:w-2/3 mx-auto justify-center item-center xsm:text-center lg:text-left">
            <p className="text-[#3BAFCA] mb-5">START YOUR BUSINESS</p>
            <h1 className="lg:text-5xl text-white md:text-3xl text-2xl font-bold mb-5">
              Build Hub
            </h1>
            <p className="mb-8  text-white">
            The First Web App BuildHub is a platform that helps Builder and Client to connect with each other. We are here to help you to find your dream home. 
            </p>
            <div className="btn flex">
              <Link to="/login">
                <button className="p-4 py-4  xl:w-48 xsm:w-full text-center rounded bg-[#2B64F8]">
                  Get Started
                </button>
              </Link>
              <button className="p-4 py-4 ml-3 xl:w-48 xsm:w-full text-center text-white  border rounded ">
                Learn more{" "}
              </button>
            </div>
          </div>
          <div className="img ">
            <img src="/assets/images/headerMobil.png" alt="" width={700} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
