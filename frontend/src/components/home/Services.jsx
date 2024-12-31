import { Link } from "react-router-dom";
import React from "react";

const Services = () => {
  return (
    <>
      <section id="howItWork" className="bg-gray-100 p-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-2">
            <div className="mx-auto">
              <img
                src="/assets/images/work.png"
                alt="Mobile Vector"
                className="mx-auto -mt-24"
                width={500}
              />
            </div>
            {/* Card 1: Signup */}
            <div className="grid-cols-2 space-y-5">
              <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out">
                <div className="text-center mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Signup
                </h3>
                <p className="text-gray-600 text-center">
                  Create your account and get started with BuildHub.
                </p>
              </div>

              {/* Card 2: Submit Request */}
              <div className="bg-gray-200 rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:bg-white">
                <div className="text-center mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Submit Request
                </h3>
                <p className="text-gray-600 text-center">
                  Describe your project and submit your request.
                </p>
              </div>

              {/* Card 3: Enjoy the Service */}
              <div className="bg-gray-200 rounded-lg shadow-md p-6 transition duration-300 ease-in-out hover:bg-white">
                <div className="text-center mb-4">
                  <svg
                    className="w-12 h-12 text-blue-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  Enjoy the Service
                </h3>
                <p className="text-gray-600 text-center">
                  Sit back and enjoy our efficient and reliable service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
