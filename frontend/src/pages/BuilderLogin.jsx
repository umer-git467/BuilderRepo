import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";  

function BuilderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5006/login-Builder", {
        email,
        password,
      });
  
      if (response.data.message === "Login successful") {
        const builder = response.data.builder;
        sessionStorage.setItem("builder", JSON.stringify({
           _id: builder._id,  
          email: builder.email,
          firstName: builder.firstName,
          lastName: builder.lastName,
          phoneno: builder.phoneno,
          image: builder.image,
          role: builder.role
        }));
        navigate("/builder/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#b6cadf98] to-[#9bd8eb4f] flex flex-col">
      <header className="bg-gradient-to-l from-blue-500 to-purple-600 py-6 shadow-lg">
        <h1 className="text-white text-4xl font-bold ml-8">Build Hub</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="flex items-center justify-center bg-gradient-to-l from-blue-500 to-purple-600">
          <div className="flex w-full max-w-6xl bg-gray-200 rounded-lg shadow-2xl overflow-hidden">
            <div className="w-1/2 p-8 relative">
              <Link to="/sign-in">
              <BsArrowLeft className="absolute top-4 left-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800" />
              </Link>
              <h2 className="text-4xl font-bold text-[#1B293B] mb-6 text-center">
                Builder Sign In
              </h2>
              <div className="space-y-6">
                <div className="relative">
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
            <div className="w-1/2">
              <img
                src="assets/images/login.jpg"
                alt="Login"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-l from-blue-500 to-purple-600 py-7 mt-8"></footer>
    </div>
  );
}

export default BuilderLogin;
