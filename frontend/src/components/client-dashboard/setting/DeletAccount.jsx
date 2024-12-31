import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteAccountWarning = ({ onClose }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const client = JSON.parse(sessionStorage.getItem("client"));
      if (!client || !client._id) {
        console.error("Client information not found");
        return;
      }

      await axios.delete(`http://localhost:5006/delete-client/${client._id}`);
      
      sessionStorage.removeItem("client");
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Warning: Delete Account</h2>
        <p className="mb-4">
          Are you sure you want to permanently delete your account? This action
          cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded mr-2"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountWarning;
