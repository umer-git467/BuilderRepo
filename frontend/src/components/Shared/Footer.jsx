import { Link } from "react-router-dom";
import React from "react";

const footerIcon = [
  {
    name: "twitter",
    img: "/assets/icons/linkedin.png",
  },
  {
    name: "linkdin",
    img: "/assets/icons/twitter.png",
  },
  {
    name: "facebook",
    img: "/assets/icons/facebook.png",
  },
];

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      <section className="bg-[#1B293B] py-10">
        <div className="container mx-auto grid lg:grid-cols-4 text-white gap-5">
          <div className="logo">
            <h3 className="text-5xl font-bold ">Buil Hub</h3>
            <p className="my-8">
              The First Web App BuildHub is a platform that helps Builder and Client to connect with each other. We are here to help you to find your dream home. 
            </p>
            <div className="social-media flex items-center space-x-6">
              {footerIcon.map((icons, index) => (
                <img key={index} src={icons.img} alt={icons.name} />
              ))}
            </div>
          </div>
          <div className="logo leading-8">
            <h1 className="text-xl font-semibold mb-6">Quick Links</h1>
            <ul>
              <Link  to="/" onClick={() => scrollToSection('faqs')}><li >Order & Receive</li></Link>
              <Link  to="/" onClick={() => scrollToSection('howItWork')}><li >How It Work</li></Link>
            </ul>
          </div>
          <div className="logo leading-8">
            <h1 className="text-xl font-semibold mb-6">Our Products</h1>
            <ul>
            <Link to="/" onClick={() => scrollToSection('aboutus')}><li>About Us</li></Link>
            <Link to="/" onClick={() => scrollToSection('contact')}><li>Contact Us</li></Link>
            </ul>
          </div>
          <div className="logo leading-8">
            <h1 className="text-xl font-semibold mb-6">Company</h1>
            <ul>
            <Link to="/" onClick={() => scrollToSection('aboutus')}><li>About Us</li></Link>
            <Link to="/" onClick={() => scrollToSection('contact')}><li>Contact Us</li></Link>
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-[#253950]">
        <div className="container grid lg:grid-cols-1 mx-auto gap-7 text-white py-6 ">
          <div className="text-center">
            <p>
              Copyright © 2023 codeflow, All rights reserved. Powered by Buil
              Hub
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
