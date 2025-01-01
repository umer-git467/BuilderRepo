import React, { useState, useEffect } from "react";
import { LuExternalLink } from "react-icons/lu";
import {
  FaChalkboardTeacher, FaFlask, FaUniversity, FaUserTie, FaBook, FaHospital, FaAmbulance, FaTimes, FaBuilding, FaBed, FaUtensils, FaWarehouse,
  FaUser, 
  FaCalendar,
  FaDollarSign,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaBath,
} from "react-icons/fa";
import axios from "axios";

function HomeTableClientDashboard({ searchTerm }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);


  useEffect(() => {
    fetchAcceptedProjects(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchAcceptedProjects();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const fetchAcceptedProjects = async () => {
    try {
      const clientid = JSON.parse(sessionStorage.getItem("client"));
      const clientId = clientid?._id;

      if (!clientId) {
        console.error("Client ID not found in session storage");
        return;
      }

      const response = await axios.get(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/accepted-projectsclientId/${clientId}`);
      setTableData(response.data.data);
    } catch (error) {
      console.error("Error fetching accepted projects:", error);
    }
  };


  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedNotification(null);
  };
  const filteredData = tableData.filter((row) =>
    row.builderName.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
        <thead className="text-white uppercase bg-gradient-to-r from-blue-500 to-purple-600">
          <tr>
            <th scope="col" className="px-6 py-3">Builder Name</th>
            <th scope="col" className="px-6 py-3">Cost</th>
            <th scope="col" className="px-6 py-3">Start Date</th>
            <th scope="col" className="px-6 py-3">End Date</th>
            <th scope="col" className="px-6 py-3">State</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row._id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {row.builderName}
              </td>
              <td className="px-6 py-4">{row.builderPrice}</td>
              <td className="px-6 py-4">{new Date(row.startDate).toISOString().slice(0, 10)}</td>
              <td className="px-6 py-4">{new Date(row.endDate).toISOString().slice(0, 10)}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 font-semibold leading-tight rounded-full ${row.status === "Pending"
                    ? "text-yellow-700 bg-yellow-100"
                    : row.status === "In Progress"
                      ? "text-green-700 bg-green-100"
                      : row.status === "pending complete"
                        ? "text-blue-700 bg-blue-100"
                        : row.status === "Complete"
                          ? "text-purple-700 bg-purple-100"
                          : "text-red-700 bg-red-100"
                    }`}
                >
                  {row.status}
                </span>

              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setSelectedNotification(row);
                    setShowPopup(true);
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  <LuExternalLink className="inline-block mr-1" /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-indigo-600">
                Project Details
              </h2>
              <button
                onClick={handlePopupClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <DetailItem
                  icon={<FaBuilding className="text-indigo-500" />}
                  label="Project Name"
                  value={selectedNotification.projectName}
                />
                <DetailItem
                  icon={<FaBuilding className="text-indigo-500" />}
                  label="Project Type"
                  value={selectedNotification.projectType}
                />
                <DetailItem
                  icon={<FaUser className="text-indigo-500" />}
                  label="Builder Name"
                  value={selectedNotification.builderName}
                />
                <DetailItem
                  icon={<FaCalendar className="text-indigo-500" />}
                  label="Start Date"
                  value={new Date(selectedNotification.startDate).toISOString().slice(0, 10)}
                />
                <DetailItem
                  icon={<FaCalendar className="text-indigo-500" />}
                  label="End Date"
                  value={new Date(selectedNotification.endDate).toISOString().slice(0, 10)}
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <DetailItem
                  icon={<FaDollarSign className="text-blue-500" />}
                  label="Price"
                  value={`$${selectedNotification.builderPrice.toLocaleString()}`}
                />
                <DetailItem
                  icon={<FaRulerCombined className="text-blue-500" />}
                  label="Square Feet"
                  value={`${selectedNotification.squareFeet.toLocaleString()} sq ft`}
                />
                <DetailItem
                  icon={<FaMapMarkerAlt className="text-blue-500" />}
                  label="Location"
                  value={selectedNotification.location}
                />
              </div>
              <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
                <h3 className="text-lg font-semibold mb-2 text-green-700">
                  Property Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <DetailItem
                    icon={<FaBuilding className="text-green-500" />}
                    label="Floors"
                    value={selectedNotification.floors}
                  />
                  {selectedNotification.projectType === 'home' && (
                    <>
                      <DetailItem
                        icon={<FaBed className="text-green-500" />}
                        label="Bedrooms"
                        value={selectedNotification.bedrooms}
                      />
                      <DetailItem
                        icon={<FaBath className="text-green-500" />}
                        label="Washrooms"
                        value={selectedNotification.washrooms}
                      />
                      <DetailItem
                        icon={<FaUtensils className="text-green-500" />}
                        label="Kitchens"
                        value={selectedNotification.kitchens}
                      />
                      <DetailItem
                        icon={<FaWarehouse className="text-green-500" />}
                        label="Store Rooms"
                        value={selectedNotification.storeRooms}
                      />
                    </>
                  )}
                  {selectedNotification.projectType === 'hospital' && (
                    <>
                      <DetailItem
                        icon={<FaBed className="text-green-500" />}
                        label="General Wards"
                        value={selectedNotification.generalWards}
                      />
                      <DetailItem
                        icon={<FaBed className="text-green-500" />}
                        label="Private Rooms"
                        value={selectedNotification.privateRooms}
                      />
                      <DetailItem
                        icon={<FaBed className="text-green-500" />}
                        label="ICU Rooms"
                        value={selectedNotification.icuRooms}
                      />
                      <DetailItem
                        icon={<FaHospital className="text-green-500" />}
                        label="Operation Theaters"
                        value={selectedNotification.operationTheaters}
                      />
                      <DetailItem
                        icon={<FaAmbulance className="text-green-500" />}
                        label="Emergency Rooms"
                        value={selectedNotification.emergencyRooms}
                      />
                    </>
                  )}
                  {selectedNotification.projectType === 'university' && (
                    <>
                      <DetailItem
                        icon={<FaChalkboardTeacher className="text-green-500" />}
                        label="Classrooms"
                        value={selectedNotification.classrooms}
                      />
                      <DetailItem
                        icon={<FaFlask className="text-green-500" />}
                        label="Laboratories"
                        value={selectedNotification.laboratories}
                      />
                      <DetailItem
                        icon={<FaUniversity className="text-green-500" />}
                        label="Lecture Halls"
                        value={selectedNotification.lectureHalls}
                      />
                      <DetailItem
                        icon={<FaUserTie className="text-green-500" />}
                        label="Faculty Offices"
                        value={selectedNotification.facultyOffices}
                      />
                      <DetailItem
                        icon={<FaBook className="text-green-500" />}
                        label="Library Capacity"
                        value={selectedNotification.libraryCapacity}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeTableClientDashboard;
