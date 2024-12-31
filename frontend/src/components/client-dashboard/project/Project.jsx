import React, { useState, useEffect } from "react";
import { FaBuilding, FaUser, FaDollarSign, FaMapMarkerAlt, FaBed, FaBath, FaUtensils, FaWarehouse, FaHospital, FaAmbulance, FaShieldVirus, FaRulerVertical, FaChalkboardTeacher, FaFlask, FaUniversity, FaUserTie, FaBook, FaRulerHorizontal } from "react-icons/fa";
import { GiGate ,GiConcreteBag ,GiBrickPile,GiSteelClaws ,GiLargePaintBrush ,GiSwitchWeapon ,GiWoodPile ,GiElectric ,GiTeePipe ,GiKitchenTap ,GiCeilingBarnacle } from "react-icons/gi";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Project() {
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [projectType, setProjectType] = useState("");

  const [projectData, setProjectData] = useState({
    projectName: "",
    clientName: "",
    price: "",
    projectType: "",
    location: "",
    squareFeet: "",
    clientcomment: [],
    floors: "",
    bedrooms: "",
    washrooms: "",
    kitchens: "",
    storeRooms: "",
    generalWards: "",
    privateRooms: "",
    icuRooms: "",
    operationTheaters: "",
    emergencyRooms: "",
    recoveryRooms: "",
    isolationRooms: "",
    classrooms: "",
    laboratories: "",
    lectureHalls: "",
    facultyOffices: "",
    libraryCapacity: "",
    cafeteriaCapacity: "",

    brickQuality: "",
    concreteQuality: "",
    steelQuantity: "",
    cementCompany: "",
    paintCompany: "",
    ceiling: "",
    switchPlate: "",
    gate: "",
    woodWork: "",
    kitchenWork: "",
    electricCable: "",
    sewerage: "",
    automaticMainSwitch: "",
  });
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const client = JSON.parse(sessionStorage.getItem("client"));
    if (client && client.firstName && client.lastName) {
      setProjectData((prevData) => ({
        ...prevData,
        clientName: `${client.firstName} ${client.lastName}`,
      }));
    }
  }, []);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProjectData(prevData => {
      const newData = { ...prevData, [name]: value };

      if (name === 'length' || name === 'width') {
        const length = newData.length || '';
        const width = newData.width || '';
        newData.squareFeet = `${length}${length && width ? '*' : ''}${width}`;
      }

      return newData;
    });
    setErrors({ ...errors, [name]: "" });
  };
  const handleCommentInput = (e) => {
    setCommentText(e.target.value);
  };
  const handleAddComment = () => {
    if (commentText.trim()) {
      setProjectData((prevData) => ({
        ...prevData,
        clientcomment: [...prevData.clientcomment, commentText]
      }));
      setCommentText("");
    }
  };
  const handleRemoveComment = (index) => {
    setProjectData((prevData) => ({
      ...prevData,
      clientcomment: prevData.clientcomment.filter((_, i) => i !== index),
    }));
  };
  const handleProjectTypeChange = (e) => {
    const selectedType = e.target.value;
    setProjectType(selectedType);
    setProjectData(prevData => ({
      ...prevData,
      projectType: selectedType,
      floors: "",
      bedrooms: "",
      washrooms: "",
      kitchens: "",
      storeRooms: "",
      generalWards: "",
      privateRooms: "",
      icuRooms: "",
      operationTheaters: "",
      emergencyRooms: "",
      recoveryRooms: "",
      isolationRooms: "",
      classrooms: "",
      laboratories: "",
      lectureHalls: "",
      facultyOffices: "",
      libraryCapacity: "",
      cafeteriaCapacity: "",

      brickQuality: "",
      concreteQuality: "",
      steelQuantity: "",
      cementCompany: "",
      paintCompany: "",
      ceiling: "",
      switchPlate: "",
      gate: "",
      woodWork: "",
      kitchenWork: "",
      electricCable: "",
      sewerage: "",
      automaticMainSwitch: "",
    }));
  };
  const validateForm = () => {
    let tempErrors = {};

    // Common fields for all project types
    if (!projectData.projectName.trim()) tempErrors.projectName = "Project name is required";
    if (!projectData.price.trim()) tempErrors.price = "Price is required";
    if (!projectData.location.trim()) tempErrors.location = "Location is required";
    if (!projectData.squareFeet.trim()) tempErrors.squareFeet = "Square feet is required";
    if (!projectData.floors.toString().trim()) tempErrors.floors = "Floors is required";

    if (!projectData.brickQuality.toString().trim()) tempErrors.brickQuality = "brick Quality is required";
    if (!projectData.concreteQuality.toString().trim()) tempErrors.concreteQuality = "Concrete Quality is required";
    if (!projectData.steelQuantity.toString().trim()) tempErrors.steelQuantity = "Steel Quality is required ";
    if (!projectData.gate.toString().trim()) tempErrors.gate = "Gate work is required Y/N";
    if (!projectData.woodWork.toString().trim()) tempErrors.woodWork = "Wood work is required Y/N";
    if (!projectData.electricCable.toString().trim()) tempErrors.electricCable = "electricCable work is required Y/N";
    if (!projectData.sewerage.toString().trim()) tempErrors.sewerage = "Sewerage work is required Y/N";
    if (!projectData.automaticMainSwitch.toString().trim()) tempErrors.automaticMainSwitch = "AutomaticMainSwitch work is required Y/N";
    if (!projectData.cementCompany.toString().trim()) tempErrors.cementCompany = "cementCompany is required Y/N";
    if (!projectData.paintCompany.toString().trim()) tempErrors.paintCompany = "paintCompany is required Y/N";
    if (!projectData.switchPlate.toString().trim()) tempErrors.switchPlate = "switchPlate is required Y/N";

    if (!projectData.projectType) tempErrors.projectType = "Project Type is required";

    // Specific validations based on project type
    if (projectType === 'home') {
      if (!projectData.bedrooms.toString().trim()) tempErrors.bedrooms = "Bedrooms is required";
      if (!projectData.washrooms.toString().trim()) tempErrors.washrooms = "Washrooms is required";
      if (!projectData.kitchens.toString().trim()) tempErrors.kitchens = "Kitchens is required";
      if (!projectData.storeRooms.toString().trim()) tempErrors.storeRooms = "Store rooms is required";
      if (!projectData.ceiling.toString().trim()) tempErrors.ceiling = "Ceiling work is required Y/N";
      if (!projectData.kitchenWork.toString().trim()) tempErrors.kitchenWork = "kitchen work is required Y/N";
    }

    else if (projectType === 'hospital') {
      if (!projectData.generalWards.toString().trim()) tempErrors.generalWards = "General wards is required";
      if (!projectData.privateRooms.toString().trim()) tempErrors.privateRooms = "Private rooms is required";
      if (!projectData.icuRooms.toString().trim()) tempErrors.icuRooms = "ICU rooms is required";
      if (!projectData.operationTheaters.toString().trim()) tempErrors.operationTheaters = "Operation Theaters rooms is required";
      if (!projectData.emergencyRooms.toString().trim()) tempErrors.emergencyRooms = "Emergency rooms is required";
      if (!projectData.recoveryRooms.toString().trim()) tempErrors.recoveryRooms = "Recovery rooms is required";
      if (!projectData.isolationRooms.toString().trim()) tempErrors.isolationRooms = "Isolation rooms is required";

    } else if (projectType === 'university') {
      if (!projectData.classrooms.toString().trim()) tempErrors.classrooms = "Classrooms is required";
      if (!projectData.laboratories.toString().trim()) tempErrors.laboratories = "Laboratories is required";
      if (!projectData.lectureHalls.toString().trim()) tempErrors.lectureHalls = "Lecture halls is required";
      if (!projectData.facultyOffices.toString().trim()) tempErrors.facultyOffices = "faculty Offices is required";
      if (!projectData.libraryCapacity.toString().trim()) tempErrors.libraryCapacity = "library rooms is required";
      if (!projectData.cafeteriaCapacity.toString().trim()) tempErrors.cafeteriaCapacity = "Cafeterias is required";
    }
    const estimatedPrice = estimatePrice();
    const enteredPrice = parseInt(projectData.price) || 0;
    if (enteredPrice < estimatedPrice) {
      tempErrors.price = `Price must be at least ${estimatedPrice}`;
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }
  const estimatePrice = () => {
    let basePrice = 0;
    const squareFeet = parseInt(projectData.squareFeet) || 0;
    const floors = parseInt(projectData.floors) || 0;

    // Base price calculation
    basePrice = squareFeet * 100;

    // Add price for floors
    basePrice += floors * 2000000;
    // Brick Quality
    if (projectData.brickQuality === 'Normal') basePrice += 1000000;
    else if (projectData.brickQuality === 'Stander') basePrice += 1500000;
    else if (projectData.brickQuality === 'Premium') basePrice += 2000000;
    // Concrete Quality
    if (projectData.concreteQuality === 'Normal') basePrice += 1500000;
    else if (projectData.concreteQuality === 'Stander') basePrice += 2000000;
    else if (projectData.concreteQuality === 'Premium') basePrice += 2500000;
    // Steel Quality
    if (projectData.steelQuantity === 'Normal') basePrice += 2000000;
    else if (projectData.steelQuantity === 'Stander') basePrice += 2500000;
    else if (projectData.steelQuantity === 'Premium') basePrice += 3000000;
    // Cement Company
    if (projectData.cementCompany === 'Normal') basePrice += 1200000;
    else if (projectData.cementCompany === 'Stander') basePrice += 1700000;
    else if (projectData.cementCompany === 'Premium') basePrice += 2200000;
    // Paint Company
    if (projectData.paintCompany === 'Normal') basePrice += 500000;
    else if (projectData.paintCompany === 'Stander') basePrice += 800000;
    else if (projectData.paintCompany === 'Premium') basePrice += 1200000;
    // Yes/No options - only add price if "Yes"
    if (projectData.gate === 'Yes') basePrice += 500000;
    if (projectData.woodWork === 'Yes') basePrice += 800000;
    if (projectData.electricCable === 'Yes') basePrice += 600000;
    if (projectData.sewerage === 'Yes') basePrice += 700000;
    if (projectData.automaticMainSwitch === 'Yes') basePrice += 400000;
    if (projectData.switchPlate === 'Yes') basePrice += 300000;

    // Add price based on project type
    switch (projectData.projectType) {
        case 'home':
            basePrice += (parseInt(projectData.bedrooms) || 0) * 1000000;
            basePrice += (parseInt(projectData.washrooms) || 0) * 500000;
            basePrice += (parseInt(projectData.kitchens) || 0) * 700000;
            basePrice += (parseInt(projectData.storeRooms) || 0) * 500000;
            if (projectData.ceiling === 'Yes') basePrice += 900000;
            if (projectData.kitchenWork === 'Yes') basePrice += 1200000;
            break;
        case 'hospital':
            basePrice += (parseInt(projectData.generalWards) || 0) * 1500000;
            basePrice += (parseInt(projectData.privateRooms) || 0) * 1000000;
            basePrice += (parseInt(projectData.icuRooms) || 0) * 2500000;
            basePrice += (parseInt(projectData.operationTheaters) || 0) * 3000000;
            basePrice += (parseInt(projectData.emergencyRooms) || 0) * 5000000;
            basePrice += (parseInt(projectData.recoveryRooms) || 0) * 1500000;
            basePrice += (parseInt(projectData.isolationRooms) || 0) * 2000000;
            break;
        case 'university':
            basePrice += (parseInt(projectData.classrooms) || 0) * 1500000;
            basePrice += (parseInt(projectData.laboratories) || 0) * 3000000;
            basePrice += (parseInt(projectData.lectureHalls) || 0) * 2500000;
            basePrice += (parseInt(projectData.facultyOffices) || 0) * 1000000;
            basePrice += (parseInt(projectData.libraryCapacity) || 0) * 7000000;
            basePrice += (parseInt(projectData.cafeteriaCapacity) || 0) * 2000000;
            break;
    }
    return basePrice;
};
  const handleSave = async () => {
    if (isSaving) return;

    if (!validateForm()) {
      toast.error('Please fill in all required fields', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setIsSaving(true);
    const client = JSON.parse(sessionStorage.getItem("client"));
    const clientId = client._id;

    const projectDataWithId = {
      ...projectData,
      clientId
    };

    try {
      const response = await axios.post("http://localhost:5006/Client-Project-Detail", projectDataWithId);
      console.log("Data saved:", response.data);
      toast.success('Project Post successfully', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setProjectData(prevData => ({
        projectName: "",
        projectType:" ",
        price: "",
        floors: "",
        bedrooms: "",
        washrooms: "",
        kitchens: "",
        storeRooms: "",

        location: "",
        squareFeet: "",
        generalWards: "",
        privateRooms: "",
        icuRooms: "",
        operationTheaters: "",
        emergencyRooms: "",
        recoveryRooms: "",
        isolationRooms: "",
        classrooms: "",
        laboratories: "",
        lectureHalls: "",
        facultyOffices: "",
        libraryCapacity: "",
        cafeteriaCapacity: "",
        length:"",
        width:"",
        brickQuality: "",
        concreteQuality: "",
        steelQuantity: "",
        cementCompany: "",
        paintCompany: "",
        ceiling: "",
        switchPlate: "",
        gate: "",
        woodWork: "",
        kitchenWork: "",
        electricCable: "",
        sewerage: "",
        automaticMainSwitch: "",

        clientcomment: []
      }));
      setCommentText("");
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error('Error posting project data', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Project Details</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-indigo-50 p-4 rounded-lg col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 mb-4 gap-4">
              {/* Project Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                  <div className="flex items-center">
                    <FaBuilding className="text-indigo-500" />
                    <span className="ml-2">Project Name</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={projectData.projectName}
                  placeholder="Project Name"
                  onChange={handleInput}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.projectName ? 'border-red-500' : ''
                    }`}
                />
                {errors.projectName && <p className="text-red-500 text-xs italic">{errors.projectName}</p>}
              </div>
              {/* Client Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientName">
                  <div className="flex items-center">
                    <FaUser className="text-indigo-500" />
                    <span className="ml-2">Client Name</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={projectData.clientName}
                  placeholder="Client Name"
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              {/* Project Type */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectType">
                  <div className="flex items-center">
                    <FaBuilding className="text-indigo-500" />
                    <span className="ml-2">Project Type</span>
                  </div>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={projectData.projectType}
                  onChange={handleProjectTypeChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Project Type</option>
                  <option value="home">Home</option>
                  <option value="hospital">Hospital</option>
                  <option value="university">University</option>
                </select>
                {errors.projectType && <p className="text-red-500 text-xs italic">{errors.projectType}</p>}
              </div>
              {/* Floors */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="floors">
                  <div className="flex items-center">
                    <FaBuilding className="text-indigo-500" />
                    <span className="ml-2">Floors</span>
                  </div>
                </label>
                <input
                  type="number"
                  id="floors"
                  value={projectData.floors}
                  name="floors"
                  placeholder="Floors"
                  onChange={handleInput}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.floors ? 'border-red-500' : ''}`}
                />
                {errors.floors && <p className="text-red-500 text-xs italic">{errors.floors}</p>}
              </div>
              {/* concrete Quality */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="concreteQuality">
                  <div className="flex items-center">
                    <GiConcreteBag className="text-indigo-500" />
                    <span className="ml-2">Concrete Quality</span>
                  </div>
                </label>
                <select
                  id="concreteQuality"
                  name="concreteQuality"
                  value={projectData.concreteQuality}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Concrete Quality</option>
                  <option value="Normal">Normal</option>
                  <option value="Stander">Stander</option>
                  <option value="Premium">Premium</option>
                </select>
                {errors.concreteQuality && <p className="text-red-500 text-xs italic">{errors.concreteQuality}</p>}
              </div>
              {/* Brick Quality */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brickQuality">
                  <div className="flex items-center">
                    <GiBrickPile className="text-indigo-500" />
                    <span className="ml-2">Brick Quality</span>
                  </div>
                </label>
                <select
                  id="brickQuality"
                  name="brickQuality"
                  value={projectData.brickQuality}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Brick Quality</option>
                  <option value="Normal">Normal</option>
                  <option value="Stander">Stander</option>
                  <option value="Premium">Premium</option>
                </select>
                {errors.brickQuality && <p className="text-red-500 text-xs italic">{errors.brickQuality}</p>}
              </div>
              {/* steel Quality */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="steelQuantity">
                  <div className="flex items-center">
                    <GiSteelClaws className="text-indigo-500" />
                    <span className="ml-2">Steel Quality</span>
                  </div>
                </label>
                <select
                  id="steelQuantity"
                  name="steelQuantity"
                  value={projectData.steelQuantity}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Steel Quality</option>
                  <option value="Normal">Normal</option>
                  <option value="Stander">Stander</option>
                  <option value="Premium">Premium</option>
                </select>
                {errors.steelQuantity && <p className="text-red-500 text-xs italic">{errors.steelQuantity}</p>}
              </div>
              {/* cementCompany Quality */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cementCompany">
                  <div className="flex items-center">
                    <GiConcreteBag  className="text-indigo-500" />
                    <span className="ml-2">cementCompany Quality</span>
                  </div>
                </label>
                <select
                  id="cementCompany"
                  name="cementCompany"
                  value={projectData.cementCompany}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select cementCompany Quality</option>
                  <option value="Normal">Normal</option>
                  <option value="Stander">Stander</option>
                  <option value="Premium">Premium</option>
                </select>
                {errors.cementCompany && <p className="text-red-500 text-xs italic">{errors.cementCompany}</p>}
              </div>
              {/* paintCompany Quality */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paintCompany">
                  <div className="flex items-center">
                    <GiLargePaintBrush className="text-indigo-500" />
                    <span className="ml-2">paintCompany Quality</span>
                  </div>
                </label>
                <select
                  id="paintCompany"
                  name="paintCompany"
                  value={projectData.paintCompany}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select paintCompany Quality</option>
                  <option value="Normal">Normal</option>
                  <option value="Stander">Stander</option>
                  <option value="Premium">Premium</option>
                </select>
                {errors.paintCompany && <p className="text-red-500 text-xs italic">{errors.paintCompany}</p>}
              </div>

              {/* switchPlate Work */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="switchPlate">
                  <div className="flex items-center">
                    <GiSwitchWeapon className="text-indigo-500" />
                    <span className="ml-2">SwitchPlate Work</span>
                  </div>
                </label>
                <select
                  id="switchPlate"
                  name="switchPlate"
                  value={projectData.switchPlate}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select SwitchPlate Work Y/N</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.switchPlate && <p className="text-red-500 text-xs italic">{errors.switchPlate}</p>}
              </div>
              {/* gate Work*/}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gate">
                  <div className="flex items-center">
                  <GiGate  className="text-indigo-500" />
                    <span className="ml-2">Gate Work</span>
                  </div>
                </label>
                <select
                  id="gate"
                  name="gate"
                  value={projectData.gate}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Gate Work Y/N</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.gate && <p className="text-red-500 text-xs italic">{errors.gate}</p>}
              </div>
              {/* wood Work */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="woodWork">
                  <div className="flex items-center">
                    <GiWoodPile  className="text-indigo-500" />
                    <span className="ml-2">Wood Work</span>
                  </div>
                </label>
                <select
                  id="woodWork"
                  name="woodWork"
                  value={projectData.woodWork}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Wood Work Y/N</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.woodWork && <p className="text-red-500 text-xs italic">{errors.woodWork}</p>}
              </div>
              {/* electricCable Work */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="electricCable">
                  <div className="flex items-center">
                    <GiElectric  className="text-indigo-500" />
                    <span className="ml-2">ElectricCable Work</span>
                  </div>
                </label>
                <select
                  id="electricCable"
                  name="electricCable"
                  value={projectData.electricCable}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select electricCable Work Y/N</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.electricCable && <p className="text-red-500 text-xs italic">{errors.electricCable}</p>}
              </div>
              {/* sewerage Work*/}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sewerage">
                  <div className="flex items-center">
                    <GiTeePipe  className="text-indigo-500" />
                    <span className="ml-2">sewerage Work</span>
                  </div>
                </label>
                <select
                  id="sewerage"
                  name="sewerage"
                  value={projectData.sewerage}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select sewerage Work Y/N</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.sewerage && <p className="text-red-500 text-xs italic">{errors.sewerage}</p>}
              </div>
              {/* automaticMainSwitch Work */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="automaticMainSwitch">
                  <div className="flex items-center">
                    <GiSwitchWeapon className="text-indigo-500" />
                    <span className="ml-2">automaticMainSwitch Work</span>
                  </div>
                </label>
                <select
                  id="automaticMainSwitch"
                  name="automaticMainSwitch"
                  value={projectData.automaticMainSwitch}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select automaticMainSwitch Work Y/N</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.automaticMainSwitch && <p className="text-red-500 text-xs italic">{errors.automaticMainSwitch}</p>}
              </div>

              {projectType && (
                <>
                  {projectType === 'home' && (
                    <>
                      {/* Bedrooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bedrooms">
                          <div className="flex items-center">
                            <FaBed className="text-indigo-500" />
                            <span className="ml-2">Bedrooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="bedrooms"
                          name="bedrooms"
                          value={projectData.bedrooms}
                          placeholder="Bedrooms"
                          onChange={handleInput}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.bedrooms ? 'border-red-500' : ''}`}
                        />
                        {errors.bedrooms && <p className="text-red-500 text-xs italic">{errors.bedrooms}</p>}
                      </div>
                      {/* Washrooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="washrooms">
                          <div className="flex items-center">
                            <FaBath className="text-indigo-500" />
                            <span className="ml-2">Washrooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="washrooms"
                          name="washrooms"
                          value={projectData.washrooms}
                          placeholder="Washrooms"
                          onChange={handleInput}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.washrooms ? 'border-red-500' : ''}`}
                        />
                        {errors.washrooms && <p className="text-red-500 text-xs italic">{errors.washrooms}</p>}
                      </div>
                      {/* Kitchens */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kitchens">
                          <div className="flex items-center">
                            <FaUtensils className="text-indigo-500" />
                            <span className="ml-2">Kitchens</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="kitchens"
                          name="kitchens"
                          value={projectData.kitchens}
                          placeholder="Kitchens"
                          onChange={handleInput}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.kitchens ? 'border-red-500' : ''}`}
                        />
                        {errors.kitchens && <p className="text-red-500 text-xs italic">{errors.kitchens}</p>}
                      </div>
                      {/* kitchen Work*/}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kitchenWork">
                          <div className="flex items-center">
                            <GiKitchenTap className="text-indigo-500" />
                            <span className="ml-2">Kitchen Work</span>
                          </div>
                        </label>
                        <select
                          id="kitchenWork"
                          name="kitchenWork"
                          value={projectData.kitchenWork}
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select kitchen Work Y/N</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.kitchenWork && <p className="text-red-500 text-xs italic">{errors.kitchenWork}</p>}
                      </div>
                      {/* Store Rooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storeRooms">
                          <div className="flex items-center">
                            <FaWarehouse className="text-indigo-500" />
                            <span className="ml-2">Store Rooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="storeRooms"
                          name="storeRooms"
                          value={projectData.storeRooms}
                          placeholder="Store Rooms"
                          onChange={handleInput}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.storeRooms ? 'border-red-500' : ''}`}
                        />
                        {errors.storeRooms && <p className="text-red-500 text-xs italic">{errors.storeRooms}</p>}
                      </div>
                      {/* ceiling Work */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ceiling">
                          <div className="flex items-center">
                            <GiCeilingBarnacle className="text-indigo-500" />
                            <span className="ml-2">Ceiling Work</span>
                          </div>
                        </label>
                        <select
                          id="ceiling"
                          name="ceiling"
                          value={projectData.ceiling}
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">Select Ceiling Y/N</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.ceiling && <p className="text-red-500 text-xs italic">{errors.ceiling}</p>}
                      </div>
                    </>
                  )}
                  {projectType === 'hospital' && (
                    <>
                      {/* General Wards */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="generalWards">
                          <div className="flex items-center">
                            <FaBed className="text-indigo-500" />
                            <span className="ml-2">General Wards</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="generalWards"
                          name="generalWards"
                          value={projectData.generalWards}
                          placeholder="General Wards"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.generalWards && <p className="text-red-500 text-xs italic">{errors.generalWards}</p>}
                      </div>

                      {/* Private Rooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="privateRooms">
                          <div className="flex items-center">
                            <FaBed className="text-indigo-500" />
                            <span className="ml-2">Private Rooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="privateRooms"
                          name="privateRooms"
                          value={projectData.privateRooms}
                          placeholder="Private Rooms"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.privateRooms && <p className="text-red-500 text-xs italic">{errors.privateRooms}</p>}
                      </div>

                      {/* ICU Rooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="icuRooms">
                          <div className="flex items-center">
                            <FaBed className="text-indigo-500" />
                            <span className="ml-2">ICU Rooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="icuRooms"
                          name="icuRooms"
                          value={projectData.icuRooms}
                          placeholder="ICU Rooms"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.icuRooms && <p className="text-red-500 text-xs italic">{errors.icuRooms}</p>}
                      </div>

                      {/* Operation Theaters */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="operationTheaters">
                          <div className="flex items-center">
                            <FaHospital className="text-indigo-500" />
                            <span className="ml-2">Operation Theaters</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="operationTheaters"
                          name="operationTheaters"
                          value={projectData.operationTheaters}
                          placeholder="Operation Theaters"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.operationTheaters && <p className="text-red-500 text-xs italic">{errors.operationTheaters}</p>}
                      </div>

                      {/* Emergency Rooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyRooms">
                          <div className="flex items-center">
                            <FaAmbulance className="text-indigo-500" />
                            <span className="ml-2">Emergency Rooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="emergencyRooms"
                          name="emergencyRooms"
                          value={projectData.emergencyRooms}
                          placeholder="Emergency Rooms"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.emergencyRooms && <p className="text-red-500 text-xs italic">{errors.emergencyRooms}</p>}
                      </div>

                      {/* Recovery Rooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recoveryRooms">
                          <div className="flex items-center">
                            <FaBed className="text-indigo-500" />
                            <span className="ml-2">Recovery Rooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="recoveryRooms"
                          name="recoveryRooms"
                          value={projectData.recoveryRooms}
                          placeholder="Recovery Rooms"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.recoveryRooms && <p className="text-red-500 text-xs italic">{errors.recoveryRooms}</p>}
                      </div>

                      {/* Isolation Rooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isolationRooms">
                          <div className="flex items-center">
                            <FaShieldVirus className="text-indigo-500" />
                            <span className="ml-2">Isolation Rooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="isolationRooms"
                          name="isolationRooms"
                          value={projectData.isolationRooms}
                          placeholder="Isolation Rooms"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.isolationRooms && <p className="text-red-500 text-xs italic">{errors.isolationRooms}</p>}
                      </div>
                    </>
                  )}
                  {projectType === 'university' && (
                    <>
                      {/* Classrooms */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="classrooms">
                          <div className="flex items-center">
                            <FaChalkboardTeacher className="text-indigo-500" />
                            <span className="ml-2">Classrooms</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="classrooms"
                          name="classrooms"
                          value={projectData.classrooms}
                          placeholder="Classrooms"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.classrooms && <p className="text-red-500 text-xs italic">{errors.classrooms}</p>}
                      </div>

                      {/* Laboratories */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="laboratories">
                          <div className="flex items-center">
                            <FaFlask className="text-indigo-500" />
                            <span className="ml-2">Laboratories</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="laboratories"
                          name="laboratories"
                          value={projectData.laboratories}
                          placeholder="Laboratories"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.laboratories && <p className="text-red-500 text-xs italic">{errors.laboratories}</p>}
                      </div>

                      {/* Lecture Halls */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lectureHalls">
                          <div className="flex items-center">
                            <FaUniversity className="text-indigo-500" />
                            <span className="ml-2">Lecture Halls</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="lectureHalls"
                          name="lectureHalls"
                          value={projectData.lectureHalls}
                          placeholder="Lecture Halls"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.lectureHalls && <p className="text-red-500 text-xs italic">{errors.lectureHalls}</p>}
                      </div>

                      {/* Faculty Offices */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="facultyOffices">
                          <div className="flex items-center">
                            <FaUserTie className="text-indigo-500" />
                            <span className="ml-2">Faculty Offices</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="facultyOffices"
                          name="facultyOffices"
                          value={projectData.facultyOffices}
                          placeholder="Faculty Offices"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.facultyOffices && <p className="text-red-500 text-xs italic">{errors.facultyOffices}</p>}
                      </div>

                      {/* Library Capacity */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="libraryCapacity">
                          <div className="flex items-center">
                            <FaBook className="text-indigo-500" />
                            <span className="ml-2">Library Capacity</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="libraryCapacity"
                          name="libraryCapacity"
                          value={projectData.libraryCapacity}
                          placeholder="Library Capacity"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.libraryCapacity && <p className="text-red-500 text-xs italic">{errors.libraryCapacity}</p>}
                      </div>

                      {/* Cafeteria Capacity */}
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cafeteriaCapacity">
                          <div className="flex items-center">
                            <FaUtensils className="text-indigo-500" />
                            <span className="ml-2">Cafeteria Capacity</span>
                          </div>
                        </label>
                        <input
                          type="number"
                          id="cafeteriaCapacity"
                          name="cafeteriaCapacity"
                          value={projectData.cafeteriaCapacity}
                          placeholder="Cafeteria Capacity"
                          onChange={handleInput}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.cafeteriaCapacity && <p className="text-red-500 text-xs italic">{errors.cafeteriaCapacity}</p>}
                      </div>
                    </>
                  )}
                </>
              )}
              {/* Location */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    <span className="ml-2">Location</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={projectData.location}
                  placeholder="Location"
                  onChange={handleInput}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? 'border-red-500' : ''
                    }`}
                />
                {errors.location && <p className="text-red-500 text-xs italic">{errors.location}</p>}
              </div>
              {/* Length and Width */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
                    <div className="flex items-center">
                      <FaRulerHorizontal className="text-indigo-500" />
                      <span className="ml-2">Length</span>
                    </div>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="length"
                      name="length"
                      value={projectData.length}
                      placeholder="Length"
                      onChange={handleInput}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.length ? 'border-red-500' : ''
                        }`}
                    />
                    <span className="ml-2 text-gray-600">ft</span>
                  </div>
                  {errors.length && <p className="text-red-500 text-xs italic">{errors.length}</p>}
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
                    <div className="flex items-center">
                      <FaRulerVertical className="text-indigo-500" />
                      <span className="ml-2">Width</span>
                    </div>
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      id="width"
                      name="width"
                      value={projectData.width}
                      placeholder="Width"
                      onChange={handleInput}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.width ? 'border-red-500' : ''
                        }`}
                    />
                    <span className="ml-2 text-gray-600">ft</span>
                  </div>
                  {errors.width && <p className="text-red-500 text-xs italic">{errors.width}</p>}
                </div>
              </div>
              {/* Price */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  <div className="flex items-center">
                    <FaDollarSign className="text-indigo-500" />
                    <span className="ml-2">Price (Estimated: ${estimatePrice()})</span>
                  </div>
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Price"
                  value={projectData.price}
                  onChange={handleInput}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.price ? 'border-red-500' : ''
                    }`}
                />
                {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
              </div>
              {/* Comments Section */}
              <div className="bg-yellow-50 p-4 rounded-lg col-span-2">
                <h3 className="text-lg font-semibold mb-2 text-yellow-700">Comments</h3>
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Add a comment..."
                    name="clientcomment"
                    value={commentText}
                    onChange={handleCommentInput}
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleAddComment}
                    className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded"
                  >
                    Add Comment
                  </button>
                </div>
                <div className="space-y-2">
                  {projectData.clientcomment && projectData.clientcomment.length > 0 ? (
                    projectData.clientcomment.map((clientcomment, index) => (
                      <div key={index}>
                        <p className="bg-white p-2 rounded-md" style={{ display: "flex", justifyContent: "space-between", width: "100%", }}>
                          {clientcomment}
                          <Link onClick={() => handleRemoveComment(index)} style={{ color: "red" }}>
                            <button>
                              Remove
                            </button>
                          </Link>
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="bg-white p-2 rounded-md">No comments yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={`mt-4 px-4 py-2 rounded transition duration-300 ${isSaving
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-indigo-500 text-white hover:bg-indigo-600'
          }`}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>

    </div>
  );
}

export default Project;
