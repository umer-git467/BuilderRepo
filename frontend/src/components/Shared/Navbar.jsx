import { useState } from "react";
import { Link } from "react-router-dom";

import React from "react";

const Navbar = () => {
  const navbar = [
    { text: "Home", link: "#home" },
    { text: "How it work", link: "#howItWork" },
    { text: "Client", link: "#client" },
    { text: "Builder", link: "#builder" },
    { text: "FAQs", link: "#faqs" },
    { text: "Contact Us", link: "#contact" },
  ];

  const [isOpen, setIsOpen] = useState(null);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <>
      <div className="container-fluid text-white">
        <div className="headerBg">
          <div className="navbar relative flex justify-between items-center p-5 pt-5 ">
            <div className="img flex ">
              <h1 className="text-5xl font-bold ml-10">Build Hub</h1>
            </div>
            <div className="flex justify-between mt-4 top-0">
              <ul className="lg:flex hidden text-[18px] items-center space-x-8 cursor-pointer font-sans  tracking-wider">
                {navbar.map((item, index) => (
                  <a key={item.text} href={item.link}>
                    {item.text}
                  </a>
                ))}
              </ul>
            </div>
            <div className="img flex items-center">
              <Link
                to="/login"
                id="get-started-btn"
                className="xsm:hidden lg:block mr-5 p-4 py-3 px-5 rounded bg-[#2B64F8]"
              >
                Get Started
              </Link>
              <button className="text-2xl lg:hidden" onClick={handleToggle}>
                {isOpen ? "X" : "☰"}
              </button>
            </div>
          </div>

          {/* ****** Mobile Navbar ******  */}
          {isOpen && (
            <div
              className={`flex lg:hidden duration-700 ${
                isOpen ? "mt-0 " : "-mt-[100%]"
              } bg-[#1B293B]`}
            >
              <ul className="duration-500 p-6 ml-10 font-sans tracking-wider">
                {navbar.map((item, index) => (
                  <a key={item.text} href={item.link}>
                    {item.text}
                  </a>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
