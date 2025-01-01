import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSearch, FaUserCircle } from "react-icons/fa";

function Sidebarbuilder({ selectUser, currentUser }) {
  const [searchName, setSearchName] = useState("");
  const [uniqueChats, setUniqueChats] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserChats = async () => {
        try {
            // Only fetch direct messages since we want to show message-based contacts
            const directMessagesResponse = await axios.get(
                `https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/chat/builder-clients/${currentUser._id}`
            );

            const directClients = directMessagesResponse.data.map(chat => ({
                partnerId: chat._id,
                partnerName: chat.name,
                lastMessage: chat.lastMessage,
                timestamp: chat.timestamp,
                isMessageContact: true
            }));

            setUniqueChats(directClients);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    fetchUserChats();
}, [currentUser]);


  const filteredChats = uniqueChats.filter((chat) =>
    (chat.partnerName || chat.name || '').toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="w-80 bg-gray-100 h-full flex flex-col">
      <div className="bg-blue-600 p-4 flex items-center sticky top-0 z-10">
        <FaUserCircle className="text-white text-3xl mr-3" />
        <h1 className="text-xl font-semibold text-white">
          {currentUser?.role === 'client' ? 'All Builders' : 'Connected Clients'}
        </h1>
      </div>
      <div className="p-4 bg-white sticky top-16 z-10">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            onChange={(e) => setSearchName(e.target.value)}
            type="text"
            placeholder="Search chats"
            className="w-full p-2 pl-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.partnerId}
            onClick={() => selectUser({
              id: chat.partnerId,
              name: chat.partnerName
            })}
            className="flex items-center p-4 hover:bg-blue-200 cursor-pointer transition duration-200 ease-in-out border-b border-gray-200"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
              {chat.partnerName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-800">{chat.partnerName}</h2>
                {chat.isProjectContact && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {chat.projectStatus}
                  </span>
                )}
              </div>
              {chat.isProjectContact && (
                <p className="text-xs text-gray-600">Project: {chat.projectTitle}</p>
              )}
              {chat.lastMessage && (
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebarbuilder;
