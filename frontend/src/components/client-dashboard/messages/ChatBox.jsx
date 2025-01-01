import { useState, useEffect, useRef } from "react";
import { IoNavigateCircle } from "react-icons/io5";
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app');

function Chatclient({ selectedUser, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?.id || !currentUser?._id) return;

    const chatRoomId = `${currentUser._id}-${selectedUser.id}`;
    socket.emit('join', chatRoomId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/chat/messages`, {
          params: {
            senderId: currentUser._id,
            receiverId: selectedUser.id
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => {
      socket.off('message');
    };
  }, [selectedUser?.id, currentUser?._id]);

  const sendMessage = async () => {
    if (newMessage.trim() && selectedUser?.id && currentUser?._id) {
      const messageData = {
        sender: currentUser._id,
        senderModel: 'Client',
        receiver: selectedUser.id,
        receiverModel: 'Builder',
        message: newMessage.trim()
      };

      socket.emit('sendMessage', messageData);
      setNewMessage("");
    }
  };

  const isCurrentUserSender = (msg) => {
    return msg.sender && currentUser && msg.sender._id === currentUser._id;
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      <div className="bg-blue-500 p-3 flex items-center sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full mr-3 bg-gray-300 flex items-center justify-center text-white">
          {selectedUser?.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-white">{selectedUser?.name}</h2>
          <p className="text-sm text-white opacity-75">{selectedUser?.businessname}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[45%] mx-2 my-1 p-2 rounded-lg ${
              isCurrentUserSender(msg)
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-100"
            }`}
          >
            <div>{msg.message}</div>
            <div className="text-xs opacity-75 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-100 p-3 flex items-center sticky bottom-0 z-10">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Type a message"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center"
        >
          <IoNavigateCircle className="text-xl mr-1" />
          Send
        </button>
      </div>
    </div>
  );
}


export default Chatclient;
