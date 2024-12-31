import React, { useState, useEffect } from "react";
import PersonalInfoModal from "../setting/PersonalInfo";
import AccountSettings from "../setting/Account";
import { useNavigate } from "react-router-dom";
import {
  FaChevronRight,
  FaUser,
  FaCog,
  FaSync,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const Setting = () => {
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const cardStyle = `
    flex justify-between items-center w-full md:w-[400px] p-6 bg-white dark:bg-gray-800
    shadow-lg rounded-lg cursor-pointer transition-all duration-300 ease-in-out
    hover:shadow-xl hover:scale-105 hover:bg-blue-50 dark:hover:bg-gray-700
  `;

  const iconStyle = "text-2xl text-blue-500 dark:text-blue-300";

  return (
    <div
      className={`h-[73vh] rounded-md ${darkMode
          ? "bg-gradient-to-tl from-blue-600 to-purple-600"
          : "bg-gradient-to-br from-blue-300 to-purple-300"
        } transition-colors duration-500`}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-800"
              }  dark:text-white`}
          >
            Settings
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div
            className={cardStyle}
            onClick={() => setShowPersonalInfoModal(true)}
          >
            <div className="flex items-center">
              <FaUser className={`mr-4 ${iconStyle}`} />
              <span className="text-lg font-semibold dark:text-white">
                Personal Information
              </span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>
          {showPersonalInfoModal && (
            <PersonalInfoModal
              onClose={() => setShowPersonalInfoModal(false)}
            />
          )}

          <div
            className={cardStyle}
            onClick={() => setShowAccountSettings(true)}
          >
            <div className="flex items-center">
              <FaCog className={`mr-4 ${iconStyle}`} />
              <span className="text-lg font-semibold dark:text-white">
                Account Settings
              </span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>
          {showAccountSettings && (
            <AccountSettings onClose={() => setShowAccountSettings(false)} />
          )}

          <div
            className={cardStyle}
            onClick={() => window.location.reload(false)}
          >
            <div className="flex items-center">
              <FaSync className={`mr-4 ${iconStyle}`} />
              <span className="text-lg font-semibold dark:text-white">
                Reload Page
              </span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>

          <div
            className={`${cardStyle} hover:bg-red-50 dark:hover:bg-red-900`}
            onClick={() => {
              sessionStorage.removeItem("builder");
              sessionStorage.removeItem("client");
              navigate("/");
            }}
          >
            <div className="flex items-center">
              <FaSignOutAlt className="mr-4 text-2xl text-red-500" />
              <span className="text-lg font-semibold text-red-500">Logout</span>
            </div>
            <FaChevronRight className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
