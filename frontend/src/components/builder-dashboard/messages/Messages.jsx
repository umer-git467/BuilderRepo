import React, { useState, useEffect } from "react";
import Sidebarbuilder from './Sidebar';
import Chatbuilder from './ChatBox';

function Messagebuilder() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('builder'));
    if (user && user._id) {
      setCurrentUser({ 
        _id: user._id, 
        role: 'builder', 
        firstName: user.firstName,
        lastName: user.lastName 
      });
    }
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-[73vh] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      <Sidebarbuilder 
        selectUser={handleSelectUser} 
        currentUser={currentUser} 
      />
      <div className="flex-1">
        {selectedUser ? (
          <Chatbuilder 
            selectedUser={selectedUser} 
            currentUser={currentUser} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <p>Select a client to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messagebuilder;
