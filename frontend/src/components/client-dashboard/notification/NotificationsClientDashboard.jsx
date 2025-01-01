import React, { useState, useEffect } from "react";
import { LuExternalLink } from "react-icons/lu";
import { FaChalkboardTeacher, FaFlask, FaUniversity, FaUserTie, FaBook, FaHospital, FaAmbulance, FaShieldVirus, FaTimes, FaBuilding, FaUser, FaCalendar, FaDollarSign, FaRulerCombined, FaMapMarkerAlt, FaBed, FaBath, FaUtensils, FaWarehouse } from "react-icons/fa";
import axios from "axios";
import { GiGate ,GiConcreteBag ,GiBrickPile,GiSteelClaws ,GiLargePaintBrush ,GiSwitchWeapon ,GiWoodPile ,GiElectric ,GiTeePipe ,GiKitchenTap ,GiCeilingBarnacle } from "react-icons/gi";
const NotificationTable = ({ searchTerm, handleMenuClick }) => {
  const [feedback, setFeedback] = useState("");
  const [allFilterActive, setAllFilterActive] = useState(true);
  const [tasksFilterActive, setTasksFilterActive] = useState(false);
  const [notificationsFilterActive, setNotificationsFilterActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupcompleted, setshowPopupcompleted] = useState(false);
  const [showPopupcompletedrating, setshowPopupcompletedrating] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [tableData, setTableData] = useState([]);
  // Function to get client id fronm session
  const clientid = JSON.parse(sessionStorage.getItem("client"));
  const clientId = clientid?._id;
  const [tempRating, setTempRating] = useState(0);

  const handleStarClick = (star) => {
    setTempRating(star);
  };
  // function to fetch projects based on event type
  const fetchProjects = async (eventType = '') => {
    try {
      const response = await axios.get(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/projects/builder${eventType ? `/${eventType}` : ''}`);
      const filteredProjects = response.data.data.filter(item => item.clientId === clientId);
      setTableData(filteredProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    const intervalId = setInterval(() => {
      fetchProjects();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/rate-project/${selectedNotification._id}`, {
        rating: tempRating,
        feedback: feedback
      });
  
      if (response.status === 200) {
        console.log("Project rated successfully");
        setshowPopupcompletedrating(false);
        setFeedback("");
        setTempRating(0);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error rating project:", error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProjects();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleDescriptionClick = (notification) => {
    if (notification.eventTypeBuilder === "Task") {
      setSelectedNotification(notification);
      if (notification.status === "pending") {
        setShowPopup(true);
      } else if (notification.status === "pending complete") {
        setshowPopupcompleted(true);
      }
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedNotification(null);
  };
  const handlePopupClosecompleted = () => {
    setshowPopupcompleted(false);
    setSelectedNotification(null);
  };
  const handlePopupClosecompletedRating = () => {
    setshowPopupcompletedrating(false);
    setshowPopupcompleted(false);
  };
  // function to reject project
  const handleRejectProject = async (id) => {
    try {
      const response = await axios.put(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/update/${id}`, {
        status: "rejected",
        eventTypeClient: "Notification",
        eventTypeBuilder: "Notification"
      });
      if (response.status === 200) {
        console.log("Project rejected successfully");
        setShowPopup(false);  // Close the popup after rejection
        fetchProjects();  // Refresh projects after the update
      }
    } catch (error) {
      console.error("Error rejecting project:", error);
    }
  };
  // function to accept project
  const handleAcceptProject = async (id) => {
    try {
      const response = await axios.put(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/accept/${id}`);
      if (response.status === 200) {
        console.log("Project accepted successfully");
        setShowPopup(false);  // Close the popup after acceptance
        fetchProjects();  // Refresh projects after the update
      }
    } catch (error) {
      console.error("Error accepting project:", error);
    }
  };

  const handleNegotiation = (notification) => {
    handlePopupClose();
    handleMenuClick("message", {
      id: notification.builderId,
      name: notification.builderName,
      businessname: notification.builderBusinessName || ''
    });
  };

  const handleAcceptCompletedProject = async (id) => {
    try {
      const response = await axios.put(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/complete-project/${id}`, {
        status: 'Complete',
        eventTypeClient: 'Notification',
        eventTypeBuilder: 'Notification'
      });
      if (response.status === 200) {
        console.log("Project marked as complete");
        setshowPopupcompleted(false);
        setshowPopupcompletedrating(true);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error marking project as complete:", error);
    }
  };

  const handleRejectCompletedProject = async (id) => {
    try {
      const response = await axios.put(`https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/reject-completed-project/${id}`, {
        status: 'In Progress',
        eventTypeClient: 'Notification',
        eventTypeBuilder: 'Notification'
      });
      if (response.status === 200) {
        console.log("Project status reverted to In Progress");
        setshowPopupcompleted(false);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error reverting project status:", error);
    }
  };

  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center mb-4">
      {icon}
      <span className="font-semibold ml-2 mr-2">{label}:</span>
      <span>{value}</span>
    </div>
  );

  const filteredData = tableData.filter((item) => {
    const matchesEventType =
      allFilterActive ||
      (tasksFilterActive && item.eventTypeBuilder === "Task") ||
      (notificationsFilterActive && item.eventTypeBuilder === "Notification");
    const matchesSearch = item.postedDate.toLowerCase().includes(searchTerm.toLowerCase());
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
            <th scope="col" className="px-6 py-3">Builder Estimated Price</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Event Type</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">{new Date(item.postedDate).toISOString().slice(0, 10)}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{item.builderName}</td>
              <td className="px-6 py-4">{item.builderPrice}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 font-semibold text-xs leading-tight rounded-full ${item.status === "rejected" ? "text-red-700 bg-red-100" : "text-gray-700 bg-gray-100"}`}>
                  {item.status || "Pending"}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 font-semibold text-xs leading-tight rounded-full ${item.eventTypeBuilder === "Bidding" ? "text-blue-700 bg-blue-100" :
                  item.eventTypeBuilder === "Close Project" ? "text-red-700 bg-red-100" :
                    "text-green-700 bg-green-100"
                  }`}>
                  {item.eventTypeBuilder}
                </span>
              </td>
              <td className="px-6 py-4">
                {item.eventTypeBuilder === "Task" && (item.status === "pending" || item.status === "pending complete") && (
                  <button onClick={() => handleDescriptionClick(item)} className="text-blue-600 hover:text-blue-900">
                    <LuExternalLink className="text-xl" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
      {/* Header - Fixed */}
      <div className="sticky top-0 bg-white p-4 border-b z-10">
        <button
          onClick={handlePopupClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Project Details</h2>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto p-4 space-y-4 mb-4" style={{ maxHeight: 'calc(90vh - 250px)' }}>
        {/* Property Information */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-green-700">
            Property Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <DetailItem
                  icon={<FaBuilding className="text-green-500" />}
                  label="Project Type"
                  value={selectedNotification?.projectName || "N/A"}
                />
                <DetailItem
                  icon={<FaBuilding className="text-green-500" />}
                  label="Project Type"
                  value={selectedNotification?.projectType || "N/A"}
                />
                <DetailItem
                  icon={<FaBuilding className="text-green-500" />}
                  label="Floors"
                  value={selectedNotification?.floors || "N/A"}
                />
                <DetailItem
                  icon={<FaMapMarkerAlt className="text-green-500" />}
                  label="Location"
                  value={selectedNotification?.location || "N/A"}
                />
                <DetailItem
                  icon={<FaRulerCombined className="text-green-500" />}
                  label="Square Feet"
                  value={selectedNotification?.squareFeet || "N/A"}
                />
                 <DetailItem icon={<GiBrickPile className="text-green-500" />} label="Brick Quality" value={selectedNotification.brickQuality || "N/A"} />
                <DetailItem icon={<GiLargePaintBrush className="text-green-500" />} label="Paint Company" value={selectedNotification.paintCompany || "N/A"} />
                <DetailItem icon={<GiConcreteBag className="text-green-500" />} label="Cement Company" value={selectedNotification.cementCompany || "N/A"} />
                <DetailItem icon={<GiSteelClaws className="text-green-500" />} label="Steel Quality" value={selectedNotification.steelQuantity || "N/A"} />
                <DetailItem icon={<GiConcreteBag className="text-green-500" />} label="Concrete Quality" value={selectedNotification.concreteQuality || "N/A"} />
                <DetailItem icon={<GiSwitchWeapon className="text-green-500" />} label="AutomaticMainSwitch Work" value={selectedNotification.automaticMainSwitch || "N/A"} />
                <DetailItem icon={<GiTeePipe className="text-green-500" />} label="Sewerage Work" value={selectedNotification.sewerage || "N/A"} />
                <DetailItem icon={<GiElectric className="text-green-500" />} label="ElectricCable Work" value={selectedNotification.electricCable || "N/A"} />
                <DetailItem icon={<GiWoodPile className="text-green-500" />} label="Wood Work" value={selectedNotification.woodWork || "N/A"} />
                <DetailItem icon={<GiGate className="text-green-500" />} label="Gate Work" value={selectedNotification.gate || "N/A"} />
                <DetailItem icon={<GiSwitchWeapon className="text-green-500" />} label="SwitchPlate Work" value={selectedNotification.switchPlate || "N/A"} />
 

                {selectedNotification?.projectType === 'home' && (
                  <>
                    <DetailItem
                      icon={<FaBed className="text-green-500" />}
                      label="Bedrooms"
                      value={selectedNotification?.bedrooms || "N/A"}
                    />
                    <DetailItem
                      icon={<FaBath className="text-green-500" />}
                      label="Washrooms"
                      value={selectedNotification?.washrooms || "N/A"}
                    />
                    <DetailItem
                      icon={<FaUtensils className="text-green-500" />}
                      label="Kitchens"
                      value={selectedNotification?.kitchens || "N/A"}
                    />
                    <DetailItem icon={<GiKitchenTap className="text-green-500" />} label="Kitchen Work" value={selectedNotification.kitchenWork || "N/A"} />
                    <DetailItem icon={<GiCeilingBarnacle className="text-green-500" />} label="Ceiling Work" value={selectedNotification.ceiling || "N/A"} />
                    <DetailItem
                      icon={<FaWarehouse className="text-green-500" />}
                      label="Store Rooms"
                      value={selectedNotification?.storeRooms || "N/A"}
                    />
                  </>
                )}

                {selectedNotification?.projectType === 'hospital' && (
                  <>
                    <DetailItem
                      icon={<FaBed className="text-green-500" />}
                      label="General Wards"
                      value={selectedNotification?.generalWards || "N/A"}
                    />
                    <DetailItem
                      icon={<FaBed className="text-green-500" />}
                      label="Private Rooms"
                      value={selectedNotification?.privateRooms || "N/A"}
                    />
                    <DetailItem
                      icon={<FaBed className="text-green-500" />}
                      label="ICU Rooms"
                      value={selectedNotification?.icuRooms || "N/A"}
                    />
                    <DetailItem
                      icon={<FaHospital className="text-green-500" />}
                      label="Operation Theaters"
                      value={selectedNotification?.operationTheaters || "N/A"}
                    />
                    <DetailItem
                      icon={<FaAmbulance className="text-green-500" />}
                      label="Emergency Rooms"
                      value={selectedNotification?.emergencyRooms || "N/A"}
                    />
                    <DetailItem
                      icon={<FaBed className="text-green-500" />}
                      label="Recovery Rooms"
                      value={selectedNotification?.recoveryRooms || "N/A"}
                    />
                    <DetailItem
                      icon={<FaShieldVirus className="text-green-500" />}
                      label="Isolation Rooms"
                      value={selectedNotification?.isolationRooms || "N/A"}
                    />
                  </>
                )}

                {selectedNotification?.projectType === 'university' && (
                  <>
                    <DetailItem
                      icon={<FaChalkboardTeacher className="text-green-500" />}
                      label="Classrooms"
                      value={selectedNotification?.classrooms || "N/A"}
                    />
                    <DetailItem
                      icon={<FaFlask className="text-green-500" />}
                      label="Laboratories"
                      value={selectedNotification?.laboratories || "N/A"}
                    />
                    <DetailItem
                      icon={<FaUniversity className="text-green-500" />}
                      label="Lecture Halls"
                      value={selectedNotification?.lectureHalls || "N/A"}
                    />
                    <DetailItem
                      icon={<FaUserTie className="text-green-500" />}
                      label="Faculty Offices"
                      value={selectedNotification?.facultyOffices || "N/A"}
                    />
                    <DetailItem
                      icon={<FaBook className="text-green-500" />}
                      label="Library Capacity"
                      value={selectedNotification?.libraryCapacity || "N/A"}
                    />
                    <DetailItem
                      icon={<FaUtensils className="text-green-500" />}
                      label="Cafeteria Capacity"
                      value={selectedNotification?.cafeteriaCapacity || "N/A"}
                    />
                  </>
                )}
              
          </div>
        </div>
        {/* Comments Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Comments
          </h3>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            <p className="text-sm text-gray-600">{selectedNotification.builderComment}</p>
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="sticky bottom-0 bg-white p-4 border-t">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">
            Builder's Estimated Price
          </h3>
          <p className="text-2xl font-bold text-blue-600 mb-4">{selectedNotification.builderPrice}</p>
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => handleAcceptProject(selectedNotification._id)}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              Accept
            </button>
            <button
              onClick={() => handleNegotiation(selectedNotification)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Negotiate
            </button>
            <button
              onClick={() => handleRejectProject(selectedNotification._id)}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


      {showPopupcompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 py-10 rounded-lg max-w-2xl w-full relative">
            <button
              onClick={handlePopupClosecompleted}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3>Builder request to complete the project.</h3>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleAcceptCompletedProject(selectedNotification._id)}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectCompletedProject(selectedNotification._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPopupcompletedrating && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 py-10 rounded-lg max-w-2xl w-full relative">
        <button
          onClick={handlePopupClosecompletedRating}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-4">Project Rating</h3>
          <p className="mb-4">Please rate your experience with this project:</p>

          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className="text-3xl focus:outline-none hover:transform hover:scale-110 transition-transform"
              >
                {star <= tempRating ? '★' : '☆'}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Share your experience with this project..."
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!tempRating}
              className={`px-6 py-2 rounded transition duration-300 ${
                tempRating 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Submit
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
