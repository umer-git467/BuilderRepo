import React from "react";
import Navbar from "../components/Shared/Navbar";
import Compaines from "../components/home/Compaines";
import Testimonial from "../components/home/Testimonial";
import Footer from "../components/Shared/Footer";
import Services from "../components/home/Services";
import Hero from "../components/home/Hero";
import Client from "../components/home/Client";
import Builders from "../components/home/Builders";
import FAQ from "../components/home/FAQ";
import Contact from "../components/home/Contact";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Compaines />
      <Services />
      <Client />
      <Builders />
      <FAQ />
      <Testimonial />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
