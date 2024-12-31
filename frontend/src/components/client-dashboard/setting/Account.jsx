import React, { useState } from "react";
import ChangePasswordModal from "../setting/ChangePassword";
import DeleteAccountWarning from "../setting/DeletAccount";
import { FaLock, FaTrash, FaArrowLeft } from "react-icons/fa";

const AccountSettings = ({ onClose }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const buttonStyle =
    "flex items-center p-4 w-full hover:bg-gray-100 bg-white shadow rounded text-left";

  return (
    <div className="absolute inset-0 ml-24 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 w-[500px] rounded shadow space-y-4">
        <button
          onClick={() => setShowChangePassword(true)}
          className={buttonStyle}
        >
          <FaLock className="mr-3" />
          Change Password
        </button>
        {showChangePassword && (
          <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
        )}

        <button
          onClick={() => setShowDeleteWarning(true)}
          className={`${buttonStyle} text-red-500 hover:bg-red-100`}
        >
          <FaTrash className="mr-3" />
          Delete Account
        </button>
        {showDeleteWarning && (
          <DeleteAccountWarning onClose={() => setShowDeleteWarning(false)} />
        )}

        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
