const BuilderResponse = require('../Model/BuilderResponse');
const ClientprojectDetail = require('../Model/ClientprojectDetail');
const mongoose = require('mongoose');

// Function to add builder response
const addBuilderResponse = async (req, res) => {
    try {
        const {
            projectId, builderId, builderName, builderComment, builderPrice, status,
            eventTypeBuilder, projectName, clientName, location, squareFeet, floors, price, brickQuality, concreteQuality, steelQuantity, cementCompany, paintCompany, switchPlate, gate, woodWork, electricCable, sewerage, automaticMainSwitch,
            clientcomment, clientId, projectType, 
            // Project-specific fields
            bedrooms, washrooms, kitchens, storeRooms,
            generalWards, privateRooms, icuRooms, operationTheaters, emergencyRooms, recoveryRooms, isolationRooms,
            classrooms, laboratories, lectureHalls, facultyOffices, libraryCapacity, cafeteriaCapacity ,ceiling ,kitchenWork
        } = req.body;

        let responseData = {
            projectId, builderId, builderName, builderComment, builderPrice, status,
            eventTypeBuilder, projectName, clientName, location, squareFeet, floors, price, brickQuality, concreteQuality, steelQuantity, cementCompany, paintCompany, switchPlate, gate, woodWork, electricCable, sewerage, automaticMainSwitch,
            clientcomment: clientcomment || [], clientId, projectType
        };

        // Add project-specific fields based on projectType
        if (projectType === 'home') {
            responseData = {...responseData, bedrooms, washrooms, kitchens, storeRooms ,ceiling ,kitchenWork};
        } else if (projectType === 'hospital') {
            responseData = {...responseData, generalWards, privateRooms, icuRooms, operationTheaters, emergencyRooms, recoveryRooms, isolationRooms};
        } else if (projectType === 'university') {
            responseData = {...responseData, classrooms, laboratories, lectureHalls, facultyOffices, libraryCapacity, cafeteriaCapacity};
        }

        const newResponse = new BuilderResponse(responseData);

        await newResponse.save();
        res.status(201).json({
            message: "Builder response added successfully!",
            data: newResponse
        });
    } catch (error) {
        console.error("Error adding builder response:", error);
        res.status(500).json({
            message: "Error adding builder response.",
            error: error.message
        });
    }
};

const getProjectsByBuilderId = async (req, res) => {
    try {
        const { builderId } = req.params;
        const projects = await BuilderResponse.find({ builderId });
        res.status(200).json({
            message: 'Projects retrieved successfully',
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            message: 'Error fetching projects',
            error: error.message
        });
    }
};

const rejectBuilderResponse = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, eventTypeClient, eventTypeBuilder } = req.body;

        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid BuilderResponse ID' });
        }

        const updatedResponse = await BuilderResponse.findByIdAndUpdate(
            id,
            {
                status,
                eventTypeClient,
                eventTypeBuilder
            },
            { new: true } // Return the updated document
        );

        if (!updatedResponse) {
            return res.status(404).json({ message: 'Builder response not found' });
        }

        res.status(200).json({
            message: 'Builder response updated successfully',
            data: updatedResponse
        });
    } catch (error) {
        console.error('Error updating builder response:', error);
        res.status(500).json({
            message: 'Error updating builder response',
            error: error.message
        });
    }
};

const getRejectedNotifications = async (req, res) => {
    try {
        const rejectedNotifications = await BuilderResponse.find({
            status: 'rejected',
            eventTypeBuilder: 'Notification',
            eventTypeClient: 'Notification'
        });

        if (rejectedNotifications.length === 0) {
            return res.status(404).json({ message: 'No rejected notifications found' });
        }

        res.status(200).json({
            message: 'Rejected notifications retrieved successfully',
            data: rejectedNotifications
        });
    } catch (error) {
        console.error('Error fetching rejected notifications:', error);
        res.status(500).json({
            message: 'Error fetching rejected notifications',
            error: error.message
        });
    }
};

const acceptBuilderResponse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid BuilderResponse ID' });
        }
        const acceptedResponse = await BuilderResponse.findByIdAndUpdate(
            id,
            {
                status: 'In Progress',
                eventTypeClient: 'Notification',
                eventTypeBuilder: 'Notification',
                startDate: new Date()
            },
            { new: true }
        );

        if (!acceptedResponse) {
            return res.status(404).json({ message: 'Builder response not found' });
        }

        // Update the ClientprojectDetail
        await ClientprojectDetail.findByIdAndUpdate(
            acceptedResponse.projectId,
            { eventTypeClient: null }
        );

        await BuilderResponse.updateMany(
            {
                projectId: acceptedResponse.projectId,
                _id: { $ne: id }
            },
            {
                status: 'Closed',
                eventTypeClient: 'Notification',
                eventTypeBuilder: 'Notification'
            }
        );
        res.status(200).json({
            message: 'Builder response accepted and others closed successfully',
            data: acceptedResponse
        });
    } catch (error) {
        console.error('Error accepting builder response:', error);
        res.status(500).json({
            message: 'Error accepting builder response',
            error: error.message
        });
    }
};

const getAcceptedProjectsByClientId = async (req, res) => {
    try {
        const { clientId } = req.params;

        const acceptedProjects = await BuilderResponse.find({
            status: { $in: ['In Progress', 'Complete', 'pending complete'] },
            clientId: clientId,
        });

        if (acceptedProjects.length === 0) {
            return res.status(404).json({ message: 'No accepted or completed projects found for this client' });
        }

        res.status(200).json({
            message: 'Accepted and completed projects retrieved successfully',
            data: acceptedProjects
        });
    } catch (error) {
        console.error('Error fetching accepted and completed projects:', error);
        res.status(500).json({
            message: 'Error fetching accepted and completed projects',
            error: error.message
        });
    }
};

const getAcceptedProjectsByBuilderId = async (req, res) => {
    try {
        const { builderId } = req.params;

        const acceptedProjects = await BuilderResponse.find({
            status: { $in: ['In Progress', 'Complete', 'pending complete'] },
            builderId: builderId,
        });

        if (acceptedProjects.length === 0) {
            return res.status(404).json({ message: 'No accepted, completed, or pending complete projects found for this builder' });
        }

        res.status(200).json({
            message: 'Accepted, completed, and pending complete projects retrieved successfully',
            data: acceptedProjects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            message: 'Error fetching projects',
            error: error.message
        });
    }
};

const markBuilderResponseComplete = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid BuilderResponse ID' });
        }
        const updatedResponse = await BuilderResponse.findByIdAndUpdate(
            id,
            {
                status: 'pending complete',
                eventTypeBuilder: 'Task',
                eventTypeClient: 'Task'
            },
            { new: true }
        );
        if (!updatedResponse) {
            return res.status(404).json({ message: 'Builder response not found' });
        }
        res.status(200).json({
            message: 'Builder response marked as pending complete',
            data: updatedResponse
        });
    } catch (error) {
        console.error('Error marking builder response as pending complete:', error);
        res.status(500).json({
            message: 'Error marking builder response as pending complete',
            error: error.message
        });
    }
};

const completeProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, eventTypeClient, eventTypeBuilder, rating } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid BuilderResponse ID' });
        }

        const updatedResponse = await BuilderResponse.findByIdAndUpdate(
            id,
            { status, eventTypeClient, eventTypeBuilder, rating },
            { new: true }
        );

        if (!updatedResponse) {
            return res.status(404).json({ message: 'Builder response not found' });
        }

        res.status(200).json({
            message: 'Project marked as complete and rated',
            data: updatedResponse
        });
    } catch (error) {
        console.error('Error marking project as complete and rating:', error);
        res.status(500).json({
            message: 'Error marking project as complete and rating',
            error: error.message
        });
    }
};

const rejectCompletedProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, eventTypeClient, eventTypeBuilder } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid BuilderResponse ID' });
        }

        const updatedResponse = await BuilderResponse.findByIdAndUpdate(
            id,
            { status, eventTypeClient, eventTypeBuilder },
            { new: true }
        );

        if (!updatedResponse) {
            return res.status(404).json({ message: 'Builder response not found' });
        }

        res.status(200).json({
            message: 'Project status reverted to In Progress',
            data: updatedResponse
        });
    } catch (error) {
        console.error('Error reverting project status:', error);
        res.status(500).json({
            message: 'Error reverting project status',
            error: error.message
        });
    }
};

const getBuilderNotifications = async (req, res) => {
    try {
        const builderId = req.params.builderId;

        if (!mongoose.Types.ObjectId.isValid(builderId)) {
            return res.status(400).json({ message: 'Invalid Builder ID' });
        }

        const notifications = await BuilderResponse.find({
            builderId: builderId,
            eventTypeClient: 'Notification',
            status: { $in: ['pending', 'pending complete', 'Complete', 'In Progress'] }
        });

        if (notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this builder' });
        }

        res.status(200).json({
            message: 'Builder notifications retrieved successfully',
            data: notifications
        });
    } catch (error) {
        console.error('Error fetching builder notifications:', error);
        res.status(500).json({
            message: 'Error fetching builder notifications',
            error: error.message
        });
    }
};
const addProjectRating = async (req, res) => {
    try {
      const { id } = req.params;
      const { rating, feedback } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid BuilderResponse ID' });
      }
  
      const updatedResponse = await BuilderResponse.findByIdAndUpdate(
        id,
        { rating, feedback }, // Include feedback in the update
        { new: true }
      );
  
      if (!updatedResponse) {
        return res.status(404).json({ message: 'Builder response not found' });
      }
  
      res.status(200).json({
        message: 'Project rated and feedback submitted successfully',
        data: updatedResponse
      });
    } catch (error) {
      console.error('Error rating project:', error);
      res.status(500).json({
        message: 'Error rating project',
        error: error.message
      });
    }
  };
      
const getAllProjectsForBuilder = async (req, res) => {
    try {
        const projects = await BuilderResponse.find();

        if (projects.length === 0) {
            return res.status(404).json({ message: 'No projects found' });
        }

        res.status(200).json({
            message: 'Projects retrieved successfully',
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            message: 'Error fetching projects',
            error: error.message
        });
    }
};

const getCombinedProjects = async (req, res) => {
    try {
        const { eventType, builderId } = req.query;

        // Fetch tasks from ClientprojectDetail
        let taskQuery = { eventTypeClient: 'Task' };
        if (builderId) {
            taskQuery.builderId = { $ne: builderId }; // Exclude tasks where builderId is present
        }
        const tasks = await ClientprojectDetail.find(taskQuery);

        // Fetch notifications from BuilderResponse
        let notificationQuery = {
            eventTypeBuilder: 'Notification',
            builderId: builderId
        };
        const notifications = await BuilderResponse.find(notificationQuery);

        // Combine and format the results
        const combinedResults = [
            ...tasks.map(task => ({
                ...task.toObject(),
                type: 'Task',
            })),
            ...notifications.map(notification => ({
                ...notification.toObject(),
                type: 'Notification',
            }))
        ];

        // Filter based on eventType if provided
        const filteredResults = eventType
            ? combinedResults.filter(item => item.type === eventType)
            : combinedResults;

        res.status(200).json({
            message: "Combined projects retrieved successfully",
            data: filteredResults
        });
    } catch (error) {
        console.error("Error fetching combined projects:", error);
        res.status(500).json({
            message: "Error fetching combined projects",
            error: error.message
        });
    }
};

module.exports = {
    getAllProjectsForBuilder,
    addBuilderResponse,
    getProjectsByBuilderId,
    rejectBuilderResponse,
    getRejectedNotifications,
    acceptBuilderResponse,
    getAcceptedProjectsByClientId,
    getAcceptedProjectsByBuilderId,
    markBuilderResponseComplete,
    completeProject,
    rejectCompletedProject,
    getBuilderNotifications,
    addProjectRating,
    getCombinedProjects
};
