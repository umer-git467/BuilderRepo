import React, { useState, useEffect } from "react";
import Sidebarclient from "./Sidebar";
import Chatclient from "./ChatBox";
import axios from 'axios';

function Messageclient({ initialSelectedUser }) {
  const [selectedUser, setSelectedUser] = useState(initialSelectedUser);
  const [currentUser, setCurrentUser] = useState(null);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    if (initialSelectedUser) {
      setSelectedUser(initialSelectedUser);
    }
  }, [initialSelectedUser]);
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('client'));
    if (user && user._id) {
      setCurrentUser({ _id: user._id, role: 'client' });

      const fetchProjects = async () => {
        try {
          const response = await axios.get(`http://localhost:5006/accepted-projectsclientId/${user._id}`);
          setProjects(response.data.data.filter(project => project.status === 'In Progress' || project.status === 'Complete'));
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
      };
      fetchProjects();
    }
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-[73vh] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      <Sidebarclient selectUser={handleSelectUser} currentUser={currentUser} />
      <div className="flex-1">
        {selectedUser ? (
          <Chatclient selectedUser={selectedUser} currentUser={currentUser} projectId={selectedUser.projectId} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <p>Select a builder to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messageclient;
