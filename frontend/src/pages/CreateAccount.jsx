import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { BsShop } from "react-icons/bs";

function CreateAccount() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#77aee898] to-[#9bd8eb4f] flex flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-purple-800 py-6 shadow-lg">
        <h1 className="text-white text-4xl font-bold ml-8">Build Hub</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-4xl font-bold text-[#1B293B] mb-6 text-center">
            Create Account
          </h2>
          <p className="text-gray-600 mb-2 text-center">
            Already have an account?
          </p>
          <Link
            to="/sign-in"
            className="block text-center text-[#435D78] underline hover:text-[#2C3E50] font-semibold transition duration-300"
          >
            Sign In
          </Link>
        </div>

        <h3 className="text-blue-500 font-semibold mt-8 mb-4 text-xl">
          Continue as
        </h3>

        <div className="flex flex-wrap justify-center gap-8">
          <Link
            to="/builder"
            className="w-80 h-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className="h-full flex flex-col items-center justify-center p-6 transition-transform duration-300 group-hover:-translate-y-2">
              <div className="bg-blue-100 rounded-full p-6 mb-6">
                <BsShop className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Builder</h3>
              <p className="text-gray-600 text-center">
                Create and manage construction projects
              </p>
            </div>
          </Link>
          <Link
            to="/client"
            className="w-80 h-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className="h-full flex flex-col items-center justify-center p-6 transition-transform duration-300 group-hover:-translate-y-2">
              <div className="bg-purple-100 rounded-full p-6 mb-6">
                <UserCircleIcon className="h-16 w-16 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Client</h3>
              <p className="text-gray-600 text-center">
                Find and collaborate with builders
              </p>
            </div>
          </Link>
        </div>
      </main>

      <footer className="bg-gradient-to-l from-blue-500 to-purple-800 py-7 mt-8"></footer>
    </div>
  );
}

export default CreateAccount;
