import { useState } from "react";
import {
  FaRegEdit,
  FaTimes,
  FaBuilding,
  FaBed,
  FaBath,
  FaUtensils,
  FaWarehouse,
} from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";
import ProjectDetailsBuilder from "../ProjectDetailsBuilder";

function HomeTable({ searchTerm }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const TableData = [
    // ... (your existing table data)
  ]; 

  const filteredData = TableData.filter((row) =>
    row.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedNotification(null);
  };

  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center mb-4">
      {icon}
      <span className="font-semibold ml-2 mr-2">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-gray-500">
        {/* ... (your existing table header) */}
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
              {/* ... (your existing table row data) */}
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setSelectedNotification(row);
                    setShowPopup(true);
                  }}
                  className="font-medium text-blue-600 hover:underline mr-3"
                >
                  <FaRegEdit className="inline-block mr-1" /> Edit
                </button>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="font-medium text-blue-600 hover:underline"
                >
                  <LuExternalLink className="inline-block mr-1" /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProjectDetailsBuilder
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white gap-5 p-6 py-10 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={handlePopupClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="mb-3 font-bold">
              {selectedNotification.clientName} has posted this project on this
              price {selectedNotification.cost}
            </h2>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold mb-2 text-green-700">
                Property Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  icon={<FaBuilding className="text-green-500" />}
                  label="Floors"
                  value={selectedNotification.floors || "N/A"}
                />
                <DetailItem
                  icon={<FaBed className="text-green-500" />}
                  label="Bedrooms"
                  value={selectedNotification.bedrooms || "N/A"}
                />
                <DetailItem
                  icon={<FaBath className="text-green-500" />}
                  label="Washrooms"
                  value={selectedNotification.washrooms || "N/A"}
                />
                <DetailItem
                  icon={<FaUtensils className="text-green-500" />}
                  label="Kitchens"
                  value={selectedNotification.kitchens || "N/A"}
                />
                <DetailItem
                  icon={<FaWarehouse className="text-green-500" />}
                  label="Store Rooms"
                  value={selectedNotification.storeRooms || "N/A"}
                />
                <DetailItem
                  icon={<FaWarehouse className="text-green-500" />}
                  label="Location"
                  value={selectedNotification.location || "N/A"}
                />
                <DetailItem
                  icon={<FaWarehouse className="text-green-500" />}
                  label="Square Feet"
                  value={selectedNotification.squareFeet || "N/A"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeTable;
