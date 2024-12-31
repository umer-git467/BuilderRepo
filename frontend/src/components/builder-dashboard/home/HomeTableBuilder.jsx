import { useState, useEffect } from "react";
import {
  FaChalkboardTeacher, FaFlask, FaUniversity, FaUserTie, FaBook, FaHospital, FaAmbulance,
  FaRegEdit,
  FaTimes,
  FaBuilding,
  FaBed,
  FaBath,
  FaUtensils,
  FaStar,
  FaWarehouse,
} from "react-icons/fa";
import { GiGate ,GiConcreteBag ,GiBrickPile,GiSteelClaws ,GiLargePaintBrush ,GiSwitchWeapon ,GiWoodPile ,GiElectric ,GiTeePipe ,GiKitchenTap ,GiCeilingBarnacle } from "react-icons/gi";
import axios from "axios";

function HomeTableBuilder({ searchTerm }) {
  const [tableData, setTableData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null)


  useEffect(() => {
    fetchAcceptedProjects();
    const intervalId = setInterval(() => {
      fetchAcceptedProjects();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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

  const fetchAcceptedProjects = async () => {
    try {
      const builderid = JSON.parse(sessionStorage.getItem("builder"));
      const builderId = builderid?._id;

      if (!builderId) {
        console.error("builderId not found in session storage");
        return;
      }

      const response = await axios.get(`http://localhost:5006/accepted-projectsbuilderId/${builderId}`);
      setTableData(response.data.data || []); // Set data or default to empty array
    } catch (error) {
      console.error("Error fetching accepted projects:", error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedNotification(null);
  };

  const handleCompleteProject = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5006/complete/${id}`, {
        status: 'pending complete',
        eventTypeBuilder: 'Task',
        eventTypeClient: 'Task'
      });

      if (response.status === 200) {
        setTableData((prevData) =>
          prevData.map((project) =>
            project._id === id ? { ...project, status: "pending complete", eventTypeBuilder: "Task", eventTypeClient: "Task" } : project
          )
        );

        if (selectedNotification && selectedNotification._id === id) {
          setSelectedNotification((prevNotification) => ({
            ...prevNotification,
            status: "pending complete",
            eventTypeBuilder: "Task",
            eventTypeClient: "Task"
          }));
        }

        console.log("Project marked as pending complete");
      }
    } catch (error) {
      console.error("Error updating the project:", error);
    }
  };


  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center mb-4">
      {icon}
      <span className="font-semibold ml-2 mr-2">{label}:</span>
      <span>{value}</span>
    </div>
  );

  const filteredData = tableData.filter((row) =>
    row.builderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-gray-500">
        <thead className="text-white uppercase bg-gradient-to-r from-blue-500 to-purple-600">
          <tr>
            <th scope="col" className="px-6 py-3">
              Client Name
            </th>
            <th scope="col" className="px-6 py-3">
              Cost
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              State
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {row.clientName}
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
                {row.status !== "Pending" && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedNotification(row);
                        setShowPopup(true);
                      }}
                      className="font-medium text-blue-600 hover:underline mr-3"
                    >
                      <FaRegEdit className="inline-block mr-1" /> Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden relative">
            {/* Fixed Header */}
            <div className="sticky top-0 bg-white p-4 border-b z-10">
              <button
                onClick={handlePopupClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
              <h2 className="font-bold pr-8">
                {selectedNotification.clientName} has posted this project on this price {selectedNotification.builderPrice}
              </h2>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              {/* Project Details Section */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-green-700">
                  Project Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <DetailItem
                    icon={<FaWarehouse className="text-green-500" />}
                    label="Location"
                    value={selectedNotification.location}
                  />
                  <DetailItem
                    icon={<FaWarehouse className="text-green-500" />}
                    label="Square Feet"
                    value={selectedNotification.squareFeet}
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

              {/* Rating Section - Only shown when status is Complete */}
              {selectedNotification.status === "Complete" && (
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-700">
                      Project Rating
                    </h3>
                    <RatingStars rating={selectedNotification.rating || 0} />
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-purple-700">
                      Client Feedback
                    </h3>
                    <div className="bg-white p-4 rounded-lg">
                      {selectedNotification.feedback ? (
                        <p className="text-gray-700 italic">{selectedNotification.feedback}</p>
                      ) : (
                        <p className="text-gray-500">No feedback provided</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fixed Footer */}
            <div className="sticky bottom-0 bg-white p-4 border-t">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">
                  Project Status
                </h3>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-2 py-1 font-semibold text-sm leading-tight rounded-full ${selectedNotification.status === "In Progress"
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-green-700 bg-green-100"
                      }`}
                  >
                    {selectedNotification.status}
                  </span>
                  {selectedNotification.status === "In Progress" && (
                    <button
                      onClick={() => handleCompleteProject(selectedNotification._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      Mark as Complete
                    </button>
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

export default HomeTableBuilder;
