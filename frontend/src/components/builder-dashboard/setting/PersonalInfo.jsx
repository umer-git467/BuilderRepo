import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PersonalInfoModal = ({ onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [builderInfo, setBuilderInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneno: "",
  });

  useEffect(() => {
    const builder = JSON.parse(sessionStorage.getItem("builder"));
    if (builder) {
      setBuilderInfo({
        email: builder.email,
        firstName: builder.firstName,
        lastName: builder.lastName,
        phoneno: builder.phoneno || "",
      });
    }
  }, []);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBuilderInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      const builder = JSON.parse(sessionStorage.getItem("builder"));
      const response = await axios.put(`http://localhost:5006/update-builder/${builder._id}`, builderInfo);
      if (response.data.message === "Builder updated successfully") {
        sessionStorage.setItem("builder", JSON.stringify({ ...builder, ...builderInfo }));
        setIsEditing(false);
        onClose();
        toast.success(' update  Successfully' ,{
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating builder information:", error);
    }
  };

  return (
    <div className="absolute inset-0 ml-24 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-[500px] rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-blue-400 mb-1">
            Email
          </label>
          <input
            id="email"
            className="w-full border p-2 rounded"
            value={builderInfo.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div className="flex mb-4 space-x-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-blue-400 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              className="w-full border p-2 rounded"
              value={builderInfo.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-blue-400 mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              className="w-full border p-2 rounded"
              value={builderInfo.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phoneno" className="block text-sm font-medium text-blue-400 mb-1">
            Phone Number
          </label>
          <input
            id="phoneno"
            className="w-full border p-2 rounded"
            value={builderInfo.phoneno}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <button
          onClick={isEditing ? handleSave : toggleEdit}
          className="mt-4 px-6 py-2 w-full bg-blue-400 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoModal;
