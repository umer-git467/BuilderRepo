import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaBell,
  FaCog,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { FaMessage, FaPlus } from "react-icons/fa6";
import Messages from "../components/client-dashboard/messages/Messages";
import Setting from "../components/client-dashboard/setting/Setting";
import Project from "../components/client-dashboard//project/Project";

import ClientTableClietnDashborad from "../components/client-dashboard/client/ClientTableClietnDashborad";
import HomeTableClientDashboard from "../components/client-dashboard/home/HomeTableClientDashboard";
import NotificationsClientDashboard from "../components/client-dashboard/notification/NotificationsClientDashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClientDashboard = () => {
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [sessiondata, setSessiondata] = useState({ email: null, role: null });
  const navigate = useNavigate();
  const [clientImage, setClientImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setClientImage(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("clientId", sessiondata._id);

      try {
        const response = await fetch(
          "http://localhost:5006/update-client-image",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          const updatedClient = { ...sessiondata, image: result.imageUrl };
          setSessiondata(updatedClient);
          sessionStorage.setItem("client", JSON.stringify(updatedClient));
          setClientImage(result.imageUrl);
          setSelectedFile(null);
          setShowPopup(false);
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleRemoveImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:5006/remove-client-image/${sessiondata._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setClientImage("");
        const updatedClient = { ...sessiondata, image: "" };
        setSessiondata(updatedClient);
        sessionStorage.setItem("client", JSON.stringify(updatedClient));
      } else {
        console.error("Failed to remove image");
      }
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  const handleSendMessage = async () => {
    const newSentMessage = {
      content: newMessage,
      sender: "client",
      id: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, newSentMessage]);
    setNewMessage("");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB7FRlUqFMgK_pwGrQRTeSiu_ko7FoAVvM",
        method: "post",
        data: { contents: [{ parts: [{ text: newMessage }] }] },
      });

      const aiResponseText = response.data.candidates[0].content.parts[0].text;
      const newReceivedMessage = {
        content: aiResponseText,
        sender: "ai",
        id: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, newReceivedMessage]);
    } catch (error) {
      console.error("Error during message generation:", error);
    }
  };

  useEffect(() => {
    const client = JSON.parse(sessionStorage.getItem("client"));
    if (client && client.email && client.role === "client") {
      setSessiondata(client);
      setClientImage(client.image || "");
    } else {
      console.log("Invalid session or role, redirecting to login");
      navigate("/sign-in-client");
    }
  }, [navigate]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu, user = null) => {
    setSelectedMenu(menu);
    if (user) {
      setSelectedChatUser(user);
    }
  };

  const renderTable = () => {
    switch (selectedMenu) {
      case "home":
        return <HomeTableClientDashboard searchTerm={searchTerm} />;
      case "client":
        return <ClientTableClietnDashborad searchTerm={searchTerm} />;

        case "notification":
          return (
            <NotificationsClientDashboard
              searchTerm={searchTerm}
              handleMenuClick={handleMenuClick}
            />
          );
        case "message":
          return <Messages initialSelectedUser={selectedChatUser} />;
      case "project":
        return (
          <div>
            <Project />
          </div>
        );
      case "setting":
        return (
          <div>
            <Setting />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Build Hub</h1>

          <div className="text-center">
            <span className="text-2xl font-semibold">Dashboard</span>
            <span className="block text-sm font-mono bg-white bg-opacity-20 px-2 py-1 rounded-md mt-1">
              Client
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-lg">
              {sessiondata.firstName} {sessiondata.lastName}
            </span>
            <img
              onClick={() => {
                setShowPopup(true);
              }}
              src={
                clientImage
                  ? `http://localhost:5006${clientImage}`
                  : "https://via.placeholder.com/150"
              }
              alt="Client"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${isSidebarOpen ? "w-[100px]" : "w-0"
            } text-white transition-width duration-500`}
        >
          <div
            className={`fixed top-24 left-0 h-full p-6 bg-gradient-to-b from-blue-500 to-purple-800 ${isSidebarOpen ? "block" : "hidden"
              }`}
          >
            <ul className="flex flex-col items-center space-y-8 h-full">
              {[
                { name: "home", icon: FaHome, label: "Home" },
                { name: "client", icon: FaUser, label: "Builders" },
                { name: "project", icon: FaPlus, label: "Project" },
                { name: "notification", icon: FaBell, label: "Notifications" },
                { name: "message", icon: FaMessage, label: "Message" },
                { name: "setting", icon: FaCog, label: "Setting" },
              ].map((item, index) => (
                <React.Fragment key={item.name}>
                  <li
                    className={`cursor-pointer relative group transition-all duration-300 ease-in-out transform hover:scale-110`}
                    onClick={() => handleMenuClick(item.name)}
                  >
                    <div
                      className={`p-3 rounded-full ${selectedMenu === item.name
                          ? "bg-white text-blue-500"
                          : "bg-blue-400 text-white hover:bg-blue-300"
                        }`}
                    >
                      <item.icon size={24} />
                    </div>
                    <span className="absolute left-full ml-4 px-3 py-1 bg-white text-blue-500 text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {item.label}
                    </span>
                  </li>
                  {index < 5 && <hr className="w-full border-blue-400" />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto bg-gray-100">
          {/* Taskbar */}
          <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
              </div>
              {selectedMenu !== "message" &&
                selectedMenu !== "setting" &&
                selectedMenu !== "project" && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="border border-gray-300 bg-gray-50 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="w-4 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                )}
            </div>
          </div>

          {/* Render the appropriate table based on the selected menu */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {renderTable()}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-indigo-500">
                Select your Profile Picture
              </h2>
              <button
                onClick={handlePopupClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-center">
                <img
                  src={
                    clientImage
                      ? `http://localhost:5006${clientImage}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="Client"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                />
                <label
                  htmlFor="imageInput"
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                >
                  Select Image
                </label>
                {selectedFile && (
                  <button
                    onClick={handleSaveImage}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save Image
                  </button>
                )}
                {clientImage && (
                  <button
                    onClick={handleRemoveImage}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Chat Box */}
      <div className="fixed bottom-8 right-6 z-100">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <FaMessage className="w-6 h-6" />
          </button>
        )}
        {isChatOpen && (
          <div className="relative w-[400px] bg-white shadow-lg rounded-lg p-4">
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsChatOpen(false)}
            >
              <FaTimes className="text-gray-500 hover:text-gray-800" />
            </div>
            <div className="h-[550px] overflow-y-auto border-b pb-2">
              {/* Messages Display */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "client"
                      ? "justify-end"
                      : "justify-start"
                    } mb-2`}
                >
                  <div
                    className={`${message.sender === "client"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                      } p-2 rounded-lg max-w-[70%]`}
                    style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }} // Added CSS for wrapping text
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="w-full bg-blue-500 text-white mt-2 p-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
