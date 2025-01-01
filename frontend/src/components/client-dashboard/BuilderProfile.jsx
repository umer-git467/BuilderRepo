import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher, FaFlask, FaUniversity, FaUserTie, FaBook, FaHospital, FaAmbulance, FaShieldVirus, FaTimes, FaBuilding, FaBed, FaBath, FaUtensils, FaWarehouse, FaMapMarkerAlt, FaRulerCombined,
  FaEnvelope, FaCity, FaPhone, FaEye, FaUser, FaCalendar, FaDollarSign, FaStar,
} from "react-icons/fa";
import { GiGate ,GiConcreteBag ,GiBrickPile,GiSteelClaws ,GiLargePaintBrush ,GiSwitchWeapon ,GiWoodPile ,GiElectric ,GiTeePipe ,GiKitchenTap ,GiCeilingBarnacle } from "react-icons/gi";

function BuilderProfile({ isOpen, onClose, builderData }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [rating, setRating] = useState(5);
  const [completedProjects, setCompletedProjects] = useState([]);


  useEffect(() => {
    if (builderData && builderData._id) {
      fetchCompletedProjects(builderData._id);
    }
  }, [builderData]);

  const fetchCompletedProjects = async (builderId) => {
    try {
      const response = await fetch(
        `https://builder-repo-3zcu-neeryxas9-umer-git467s-projects.vercel.app/builder-completed-projects/${builderId}`
      );
      const data = await response.json();
      setCompletedProjects(data);
    } catch (error) {
      console.error("Error fetching completed projects:", error);
    }
  };


  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              className={`w-5 h-5 ${starValue <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
            />
          );
        })}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };
  if (!isOpen || !builderData) return null;

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

  const {
    firstName,
    lastName,
    email,
    city,
    phoneno,
    image,
  } = builderData;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-indigo-600 p-4 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-white">Builder Profile</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
            <div>
              <h3 className="text-3xl font-semibold mb-4 text-gray-800">
                {firstName} {lastName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center text-gray-600">
                  <FaEnvelope className="mr-2 text-indigo-500" />
                  {email}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaCity className="mr-2 text-indigo-500" />
                  {city}
                </p>
                <p className="flex items-center text-gray-600">
                  <FaPhone className="mr-2 text-indigo-500" />
                  {phoneno}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <FaBuilding className="mr-2 text-indigo-500" />
              Completed Projects
            </h3>
            {completedProjects.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Project Name</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completedProjects.map((project) => (
                    <tr key={project._id} className="border-b">
                      <td className="p-3">{project.projectName}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => {
                            setSelectedNotification(project);
                            setShowPopup(true);
                          }}
                          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
                        >
                          <FaEye className="inline-block mr-2" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No completed projects found.</p>
            )}
          </div>
          <div>
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
                        icon={<FaUser className="text-indigo-500" />}
                        label="Builder Name"
                        value={selectedNotification.builderName}
                      />
                      <DetailItem
                        icon={<FaCalendar className="text-indigo-500" />}
                        label="Start Date"
                        value={new Date(selectedNotification.startDate)
                          .toISOString()
                          .slice(0, 10)}
                      />
                      <DetailItem
                        icon={<FaCalendar className="text-indigo-500" />}
                        label="End Date"
                        value={new Date(selectedNotification.endDate)
                          .toISOString()
                          .slice(0, 10)}
                      />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <DetailItem
                        icon={<FaDollarSign className="text-blue-500" />}
                        label="Price"
                        value={`${selectedNotification.price.toLocaleString()}`}
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
                      <div className="grid grid-cols-2 gap-1">
                        <DetailItem
                          icon={<FaBuilding className="text-green-500" />}
                          label="Project Type"
                          value={selectedNotification.projectType}
                        />
                        <DetailItem
                          icon={<FaBuilding className="text-green-500" />}
                          label="Floors"
                          value={selectedNotification.floors}
                        />
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
                            <DetailItem icon={<GiKitchenTap className="text-green-500" />} label="Kitchen Work" value={selectedNotification.kitchenWork} />
                            <DetailItem icon={<GiCeilingBarnacle className="text-green-500" />} label="Ceiling Work" value={selectedNotification.ceiling} />
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
                    <div className="bg-yellow-50 p-4 rounded-lg md:col-span-2">
                      <h3 className="text-lg font-semibold text-yellow-700">
                        Project Rating
                      </h3>
                      <RatingStars rating={selectedNotification.rating || 0} />
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg md:col-span-2 mt-4">
                      <h3 className="text-lg font-semibold mb-2 text-purple-700">
                        Client Feedback
                      </h3>
                      <div className="bg-white p-4 rounded-lg">
                        {selectedNotification.feedback ? (
                          <p className="text-gray-700 italic">
                            {selectedNotification.feedback}
                          </p>
                        ) : (
                          <p className="text-gray-500">No feedback provided</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderProfile;
