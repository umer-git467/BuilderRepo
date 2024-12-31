const ClientprojectDetail = require('../Model/ClientprojectDetail');

// Function to create a new project detail
const ClientProjectDetail = async (req, res) => {
  try {
    const {
      projectName, clientName, price, location, squareFeet, clientcomment, floors,
      bedrooms, washrooms, kitchens, storeRooms, generalWards, privateRooms,
      icuRooms, operationTheaters, emergencyRooms, recoveryRooms, isolationRooms,
      classrooms, laboratories, lectureHalls, facultyOffices, libraryCapacity,
      cafeteriaCapacity, brickQuality, concreteQuality, steelQuantity, cementCompany,
      paintCompany, ceiling, switchPlate, gate, woodWork, kitchenWork, electricCable,
      sewerage, automaticMainSwitch, projectType, clientId, builderId
    } = req.body;

    const newProject = new ClientprojectDetail({
      projectName,
      clientName,
      price,
      location,
      squareFeet,
      clientcomment: clientcomment || [],
      floors,
      bedrooms,
      washrooms,
      kitchens,
      storeRooms,
      generalWards,
      privateRooms,
      icuRooms,
      operationTheaters,
      emergencyRooms,
      recoveryRooms,
      isolationRooms,
      classrooms,
      laboratories,
      lectureHalls,
      facultyOffices,
      libraryCapacity,
      cafeteriaCapacity,
      brickQuality,
      concreteQuality,
      steelQuantity,
      cementCompany,
      paintCompany,
      ceiling,
      switchPlate,
      gate,
      woodWork,
      kitchenWork,
      electricCable,
      sewerage,
      automaticMainSwitch,
      projectType,
      clientId,
      builderId,
      eventTypeClient: 'Task',
      eventTypeBuilder: ''
    });

    await newProject.save();
    res.status(201).json({
      message: "Project created successfully!",
      data: newProject
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      message: "Error creating project.",
      error: error.message
    });
  }
};

const updateClientProjectDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { builderId } = req.body;
    const project = await ClientprojectDetail.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Push new builderId if not already present
    if (builderId && !project.builderId.includes(builderId)) {
      project.builderId.push(builderId);
    }

    // Auto update eventTypeClient and eventTypeBuilder to 'Task'
    project.eventTypeClient = 'Task';
    project.eventTypeBuilder = 'Task';

    // Save the updated project details
    await project.save();

    res.status(200).json({
      message: "Project updated successfully!",
      data: project
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      message: "Error updating project.",
      error: error.message
    });
  }
};

const getClientProjectsByEventTypeClient = async (req, res) => {
  try {
    const { eventType } = req.params;
    const { builderId } = req.query;

    let query = {};

    if (eventType) {
      query.eventTypeClient = eventType;
    } else {
      query.eventTypeClient = { $exists: true, $ne: "" };
    }

    const projects = await ClientprojectDetail.find(query);

    if (projects.length === 0) {
      return res.status(404).json({ message: `No projects found for eventTypeClient: ${eventType}` });
    }

    let filteredProjects = projects.filter(project => {
      if (!project.builderId || project.builderId.length === 0) {
        return true; // Show project if builderId is not set or empty
      }

      if (!builderId) {
        return true; // Show all projects if no builderId is provided
      }

      const builderIdInProject = project.builderId.includes(builderId);

      if (eventType === 'Task') {
        return !builderIdInProject; // For Task, don't show if builderId matches
      }

      if (builderIdInProject) {
        return project.eventTypeBuilder === '' || !project.eventTypeBuilder; // Show only if eventTypeBuilder is empty or not set
      }

      return true; // Show for all other cases
    });

    res.status(200).json({ data: filteredProjects });
  } catch (error) {
    console.error("Error fetching projects by eventTypeClient:", error);
    res.status(500).json({
      message: "Error fetching projects by eventTypeClient.",
      error: error.message
    });
  }
};

module.exports = {
  ClientProjectDetail,
  updateClientProjectDetail,
  getClientProjectsByEventTypeClient
};
