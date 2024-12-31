import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaSearch, FaUserCircle } from "react-icons/fa";

function Sidebarclient({ selectUser, currentUser }) {
  const [searchName, setSearchName] = useState("");
  const [builders, setBuilders] = useState([]);

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        const response = await axios.get('http://localhost:5006/chat/builders');
        setBuilders(response.data);
      } catch (error) {
        console.error('Error fetching builders:', error);
      }
    };
    fetchBuilders();
  }, []);

  const filteredBuilders = builders.filter((builder) =>
    `${builder.firstName} ${builder.lastName}`.toLowerCase().includes(searchName.toLowerCase()) ||
    builder.businessname.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="w-80 bg-gray-100 h-full flex flex-col">
      <div className="bg-blue-600 p-4 flex items-center sticky top-0 z-10">
        <FaUserCircle className="text-white text-3xl mr-3" />
        <h1 className="text-xl font-semibold text-white">Builders</h1>
      </div>
      <div className="p-4 bg-white sticky top-16 z-10">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            onChange={(e) => setSearchName(e.target.value)}
            type="text"
            placeholder="Search builders"
            className="w-full p-2 pl-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredBuilders.map((builder) => (
          <div
            key={builder._id}
            onClick={() => selectUser({
              id: builder._id,
              name: `${builder.firstName} ${builder.lastName}`,
              businessname: builder.businessname
            })}
            className="flex items-center p-4 hover:bg-blue-200 cursor-pointer transition duration-200 ease-in-out border-b border-gray-200"
          >
            <div className="w-12 h-12 rounded-full mr-3 bg-gray-300 overflow-hidden">
              
                <div className="w-full h-full flex items-center justify-center text-white text-xl">
                  {builder.firstName[0]}
                </div>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">
                {`${builder.firstName} ${builder.lastName}`}
              </h2>
              <p className="text-sm text-gray-600">{builder.businessname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebarclient;
