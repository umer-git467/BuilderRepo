import React, { useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { FaChalkboardTeacher, FaFlask, FaUniversity, FaUserTie, FaBook, FaHospital, FaAmbulance, FaShieldVirus, FaTimes, FaBuilding, FaBed, FaBath, FaUtensils, FaWarehouse, FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { GiGate ,GiConcreteBag ,GiBrickPile,GiSteelClaws ,GiLargePaintBrush ,GiSwitchWeapon ,GiWoodPile ,GiElectric ,GiTeePipe ,GiKitchenTap ,GiCeilingBarnacle } from "react-icons/gi";
import axios from "axios";

const NotificationTable = ({ searchTerm }) => {
  const [allFilterActive, setAllFilterActive] = useState(true);
  const [tasksFilterActive, setTasksFilterActive] = useState(false);
  const [notificationsFilterActive, setNotificationsFilterActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [builderPrice, setBuilderPrice] = useState("");
  const [newComment, setNewComment] = useState("");
  const [projects, setProjects] = useState([]);

  // Modify the filter functions
  const handleAllFilter = () => {
    setAllFilterActive(true);
    setTasksFilterActive(false);
    setNotificationsFilterActive(false);
    fetchProjects();
  };
  const handleTasksFilter = () => {
    setAllFilterActive(false);
    setTasksFilterActive(true);
    setNotificationsFilterActive(false);
    fetchProjects("Task");
  };
  const handleNotificationsFilter = () => {
    setAllFilterActive(false);
    setTasksFilterActive(false);
    setNotificationsFilterActive(true);
    fetchProjects("Notification");
  };
  const handleDescriptionClick = (notification) => {
    if (notification.eventTypeClient === "Task") {
      setSelectedNotification(notification);
      setShowPopup(true);
    }
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedNotification(null);
    setBuilderPrice("");
    setNewComment("");
  };
  const handlePriceSubmit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const builderid = JSON.parse(sessionStorage.getItem("builder"));
    const builderId = builderid?._id;
    const builderFirstName = builderid?.firstName || "Unknown";
    const builderLastName = builderid?.lastName || "";
    const builderName = `${builderFirstName} ${builderLastName}`.trim();

    try {
      const response = await axios.post("https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/add-builder-response", {
        projectId: selectedNotification._id,
        builderId,
        builderName,
        builderComment: newComment,
        builderPrice,
        status: "pending",
        eventTypeBuilder: "Task",
        projectName: selectedNotification.projectName,
        postedDate: selectedNotification.postedDate,
        clientName: selectedNotification.clientName,
        location: selectedNotification.location,
        squareFeet: selectedNotification.squareFeet,
        floors: selectedNotification.floors,
        price: selectedNotification.price,
        clientcomment: selectedNotification.clientcomment || [],
        clientId: selectedNotification.clientId,
        projectType: selectedNotification.projectType,

        brickQuality: selectedNotification.brickQuality,
        concreteQuality: selectedNotification.concreteQuality,
        steelQuantity: selectedNotification.steelQuantity,
        cementCompany: selectedNotification.cementCompany,
        paintCompany: selectedNotification.paintCompany,
        gate: selectedNotification.gate,
        woodWork: selectedNotification.woodWork,
        electricCable: selectedNotification.electricCable,
        sewerage: selectedNotification.sewerage,
        automaticMainSwitch: selectedNotification.automaticMainSwitch,
        switchPlate: selectedNotification.switchPlate,
        // Home specific fields
        bedrooms: selectedNotification.bedrooms,
        washrooms: selectedNotification.washrooms,
        kitchens: selectedNotification.kitchens,
        storeRooms: selectedNotification.storeRooms,
        ceiling: selectedNotification.ceiling,        
        kitchenWork: selectedNotification.kitchenWork,
        // Hospital specific fields
        generalWards: selectedNotification.generalWards,
        privateRooms: selectedNotification.privateRooms,
        icuRooms: selectedNotification.icuRooms,
        operationTheaters: selectedNotification.operationTheaters,
        emergencyRooms: selectedNotification.emergencyRooms,
        recoveryRooms: selectedNotification.recoveryRooms,
        isolationRooms: selectedNotification.isolationRooms,
        // University specific fields
        classrooms: selectedNotification.classrooms,
        laboratories: selectedNotification.laboratories,
        lectureHalls: selectedNotification.lectureHalls,
        facultyOffices: selectedNotification.facultyOffices,
        libraryCapacity: selectedNotification.libraryCapacity,
        cafeteriaCapacity: selectedNotification.cafeteriaCapacity
      });

      console.log("Builder response added:", response.data);

      await axios.put(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/Client-Project-Detail/${selectedNotification._id}`, {
        builderId
      });

      console.log("Project updated with builder's task event type.");

      handlePopupClose();
      fetchProjects();
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsSaving(false);
    }
  };
  const fetchProjects = async (eventType = '') => {
    try {
      const builderid = JSON.parse(sessionStorage.getItem("builder"));
      const builderId = builderid?._id;

      const response = await axios.get(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/combined-projects`, {
        params: { builderId, eventType }
      });

      let projectsData = response.data.data;
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProjects();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center mb-4">
      {icon}
      <span className="font-semibold ml-2 mr-2">{label}:</span>
      <span>{value}</span>
    </div>
  );
  const filteredData = [...projects].filter((item) => {
    const matchesEventType =
      (allFilterActive) ||
      (tasksFilterActive && item.eventTypeClient === "Task") ||
      (notificationsFilterActive && item.eventTypeClient === "Notification");

    const matchesSearch = item.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesEventType && matchesSearch;
  });

  return (
    <div>
      <div className="flex space-x-4 mt-3">
        <button
          className={`bg-gradient-to-r ${allFilterActive
            ? "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            : "from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500"
            } text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 mb-4`}
          onClick={handleAllFilter}
        >
          All
        </button>
        <button
          className={`bg-gradient-to-r ${tasksFilterActive
            ? "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            : "from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500"
            } text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-4`}
          onClick={handleTasksFilter}
        >
          Tasks
        </button>
        <button
          className={`bg-gradient-to-r ${notificationsFilterActive
            ? "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
            : "from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500"
            } text-white font-semibold px-6 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 mb-4`}
          onClick={handleNotificationsFilter}
        >
          Notifications
        </button>
      </div>

      <table className="w-full text-left text-gray-500">
        <thead className="text-white uppercase bg-gradient-to-r from-blue-500 to-purple-600">
          <tr>
            <th scope="col" className="px-6 py-3">Posted Date</th>
            <th scope="col" className="px-6 py-3">Posted By</th>
            <th scope="col" className="px-6 py-3">Client Estimated Price</th>
            <th scope="col" className="px-6 py-3">Event Type</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                {item.postedDate && !isNaN(new Date(item.postedDate).getTime())
                  ? new Date(item.postedDate).toISOString().slice(0, 10)
                  : 'Invalid Date'}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">{item.clientName}</td>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 font-semibold text-xs leading-tight rounded-full ${item.eventTypeClient === "Task" ? "text-blue-700 bg-blue-100" : "text-green-700 bg-green-100"}`}>
                  {item.eventTypeClient}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 font-semibold text-xs leading-tight rounded-full ${item.status === "rejected" ? "text-red-700 bg-red-100" : "text-gray-700 bg-gray-100"}`}>
                  {item.status || "Pending"}
                </span>
              </td>
              <td className="px-6 py-4">
                {item.eventTypeClient === "Task" && item.status !== "rejected" && (
                  <button
                    onClick={() => handleDescriptionClick(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <LuExternalLink className="text-xl" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && selectedNotification && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
      {/* Header */}
      <div className="sticky top-0 bg-white p-4 border-b">
        <button
          onClick={handlePopupClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2 className="font-bold pr-8">
          {selectedNotification.clientName} has posted this project on this price {selectedNotification.price}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(90vh - 180px)' }}>
        {/* Property Details */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Property Details</h3>
          <div className="grid grid-cols-1 p-2 md:grid-cols-2 gap-2">
                <DetailItem icon={<FaBuilding className="text-green-500" />} label="Project Name" value={selectedNotification.projectName} />
                <DetailItem icon={<FaBuilding className="text-green-500" />} label="Project Type" value={selectedNotification.projectType} />
                <DetailItem icon={<FaBuilding className="text-green-500" />} label="Floors" value={selectedNotification.floors} />
                <DetailItem icon={<FaMapMarkerAlt className="text-green-500" />} label="Location" value={selectedNotification.location} />
                <DetailItem icon={<FaRulerCombined className="text-green-500" />} label="Square Feet" value={selectedNotification.squareFeet} />

                <DetailItem icon={<GiBrickPile className="text-green-500" />} label="Brick Quality" value={selectedNotification.brickQuality} />
                <DetailItem icon={<GiLargePaintBrush className="text-green-500" />} label="Paint Company" value={selectedNotification.paintCompany} />
                <DetailItem icon={<GiConcreteBag className="text-green-500" />} label="Cement Company" value={selectedNotification.cementCompany} />
                <DetailItem icon={<GiSteelClaws className="text-green-500" />} label="Steel Quality" value={selectedNotification.steelQuantity} />
                <DetailItem icon={<GiConcreteBag className="text-green-500" />} label="Concrete Quality" value={selectedNotification.concreteQuality} />
                <DetailItem icon={<GiSwitchWeapon className="text-green-500" />} label="AutomaticMainSwitch Work" value={selectedNotification.automaticMainSwitch} />
                <DetailItem icon={<GiTeePipe className="text-green-500" />} label="Sewerage Work" value={selectedNotification.sewerage} />
                <DetailItem icon={<GiElectric className="text-green-500" />} label="ElectricCable Work" value={selectedNotification.electricCable} />
                <DetailItem icon={<GiWoodPile className="text-green-500" />} label="Wood Work" value={selectedNotification.woodWork} />
                <DetailItem icon={<GiGate className="text-green-500" />} label="Gate Work" value={selectedNotification.gate} />
                <DetailItem icon={<GiSwitchWeapon className="text-green-500" />} label="SwitchPlate Work" value={selectedNotification.switchPlate} />
 

                {selectedNotification.projectType === 'home' && (
                  <>
                    <DetailItem icon={<FaBed className="text-green-500" />} label="Bedrooms" value={selectedNotification.bedrooms} />
                    <DetailItem icon={<FaBath className="text-green-500" />} label="Washrooms" value={selectedNotification.washrooms} />
                    <DetailItem icon={<FaUtensils className="text-green-500" />} label="Kitchens" value={selectedNotification.kitchens} />
                    <DetailItem icon={<GiKitchenTap className="text-green-500" />} label="Kitchen Work" value={selectedNotification.kitchenWork} />
                    <DetailItem icon={<GiCeilingBarnacle className="text-green-500" />} label="Ceiling Work" value={selectedNotification.ceiling} />
                    <DetailItem icon={<FaWarehouse className="text-green-500" />} label="Store Rooms" value={selectedNotification.storeRooms} />
                  </>
                )}

                {selectedNotification.projectType === 'hospital' && (
                  <>
                    <DetailItem icon={<FaBed className="text-green-500" />} label="General Wards" value={selectedNotification.generalWards} />
                    <DetailItem icon={<FaBed className="text-green-500" />} label="Private Rooms" value={selectedNotification.privateRooms} />
                    <DetailItem icon={<FaBed className="text-green-500" />} label="ICU Rooms" value={selectedNotification.icuRooms} />
                    <DetailItem icon={<FaHospital className="text-green-500" />} label="Operation Theaters" value={selectedNotification.operationTheaters} />
                    <DetailItem icon={<FaAmbulance className="text-green-500" />} label="Emergency Rooms" value={selectedNotification.emergencyRooms} />
                    <DetailItem icon={<FaBed className="text-green-500" />} label="Recovery Rooms" value={selectedNotification.recoveryRooms} />
                    <DetailItem icon={<FaShieldVirus className="text-green-500" />} label="Isolation Rooms" value={selectedNotification.isolationRooms} />
                  </>
                )}

                {selectedNotification.projectType === 'university' && (
                  <>
                    <DetailItem icon={<FaChalkboardTeacher className="text-green-500" />} label="Classrooms" value={selectedNotification.classrooms} />
                    <DetailItem icon={<FaFlask className="text-green-500" />} label="Laboratories" value={selectedNotification.laboratories} />
                    <DetailItem icon={<FaUniversity className="text-green-500" />} label="Lecture Halls" value={selectedNotification.lectureHalls} />
                    <DetailItem icon={<FaUserTie className="text-green-500" />} label="Faculty Offices" value={selectedNotification.facultyOffices} />
                    <DetailItem icon={<FaBook className="text-green-500" />} label="Library Capacity" value={selectedNotification.libraryCapacity} />
                    <DetailItem icon={<FaUtensils className="text-green-500" />} label="Cafeteria Capacity" value={selectedNotification.cafeteriaCapacity} />
                  </>
                )}
              
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Comments</h3>
          <div className="space-y-2 mb-3">
            {selectedNotification.clientcomment.map((comment, index) => (
              <p key={index} className="text-sm text-gray-600 bg-white p-2 rounded">{comment}</p>
            ))}
          </div>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Add a comment..."
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
      </div>

      {/* Footer - Always visible at bottom */}
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={builderPrice}
            onChange={(e) => setBuilderPrice(e.target.value)}
            placeholder="Enter your price"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handlePriceSubmit}
            disabled={isSaving}
            className={`px-6 py-2 rounded transition duration-300 ${
              isSaving
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default NotificationTable;