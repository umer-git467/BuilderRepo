import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getPasswordStrength = (password) => {
    const strength = password.length;
    if (strength === 0) return 0;
    if (strength < 4) return 1;
    if (strength < 8) return 2;
    if (strength < 12) return 3;
    return 4;
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }
  
    try {
      const client = JSON.parse(sessionStorage.getItem("client"));
      if (!client || !client._id) {
        setError("Client information not found. Please log in again.");
        return;
      }
    
      const response = await axios.post("https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/change-client-password", {
        clientId: client._id,
        currentPassword,
        newPassword,
      });
      toast.success('Password Change Successfully' ,{
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSuccess(response.data.message);
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.response?.data?.message || "An error occurred while changing the password");
      setSuccess("");
    }
    
  };
  

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const renderPasswordInput = (id, value, onChange, placeholder, showField) => (
    <div className="relative">
      <input
        id={id}
        type={showField ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="block border p-2 rounded w-full pr-10"
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={() => togglePasswordVisibility(id)}
      >
        {showField ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-[500px] rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label
            htmlFor="current"
            className="block text-sm font-medium text-blue-500 mb-1"
          >
            Current Password
          </label>
          {renderPasswordInput(
            "current",
            currentPassword,
            (e) => setCurrentPassword(e.target.value),
            "Enter current password",
            showPassword.current
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="new"
            className="block text-sm font-medium text-blue-500 mb-1"
          >
            New Password
          </label>
          {renderPasswordInput(
            "new",
            newPassword,
            (e) => setNewPassword(e.target.value),
            "Enter new password",
            showPassword.new
          )}
          <div className="mt-2 h-1 flex">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`flex-1 ${
                  index < getPasswordStrength(newPassword)
                    ? "bg-green-500"
                    : "bg-gray-300"
                } ${index > 0 ? "ml-1" : ""}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="mb-6 mt-6">
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-blue-500 mb-1"
          >
            Confirm New Password
          </label>
          {renderPasswordInput(
            "confirm",
            confirmPassword,
            (e) => setConfirmPassword(e.target.value),
            "Confirm new password",
            showPassword.confirm
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
          >
            Change
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
