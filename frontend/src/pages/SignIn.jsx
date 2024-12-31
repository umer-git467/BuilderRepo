import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { BsShop, BsPerson } from "react-icons/bs";

function SignIn() {
  const [userType, setUserType] = useState(null);



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#b6cadf98] to-[#9bd8eb4f] flex flex-col">
      <header className="bg-gradient-to-l from-blue-500 to-purple-600 py-6 shadow-lg">
        <h1 className="text-white text-4xl font-bold ml-8">Build Hub</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
       
          <>
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
              <h2 className="text-4xl font-bold text-[#1B293B] mb-6 text-center">
                Sign In
              </h2>
              <p className="text-gray-600 mb-2 text-center">
                Don't have an account?
              </p>
              <Link
                to="/create-account"
                className="block text-center text-[#435D78] underline hover:text-[#2C3E50] font-semibold transition duration-300"
              >
                Create Account
              </Link>
            </div>

            <h3 className="text-blue-500 font-semibold mt-8 mb-4 text-xl">
              Continue as
            </h3>

            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/sign-in-builder" >
              <div className="transform hover:scale-105 transition duration-300 cursor-pointer">
                <Card className="w-64 h-64 flex flex-col items-center justify-center bg-white bg-opacity-90 hover:bg-opacity-100">
                  <BsShop className="h-20 w-20 text-blue-500 mb-4" />
                  <p className="text-2xl font-bold text-center text-gray-900">
                    Builder
                  </p>
                </Card>
              </div>
              </Link>
              <Link to="/sign-in-Client" >
              <div className="transform hover:scale-105 transition duration-300 cursor-pointer">
                <Card className="w-64 h-64 flex flex-col items-center justify-center bg-white bg-opacity-90 hover:bg-opacity-100">
                  <BsPerson className="h-20 w-20 text-blue-500 mb-4" />
                  <p className="text-2xl text-center font-bold text-gray-900">
                    Client
                  </p>
                </Card>
              </div>
              </Link>
            </div>
          </>
      </main>

      <footer className="bg-gradient-to-l from-blue-500 to-purple-600 py-7 mt-8"></footer>
    </div>
  );
}

export default SignIn;
