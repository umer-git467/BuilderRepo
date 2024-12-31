const express = require('express');
const { builderController ,loginBuilder ,getAllBuilders ,getCompletedProjectsForBuilder ,updateBuilder ,changeBuilderPassword ,deleteBuilder ,updateBuilderImage ,removeBuilderImage } = require('../Functions/builderController'); 
const { ClientController ,loginClient ,getAllClients ,updateClient ,changeClientPassword ,deleteClient ,updateClientImage ,removeClientImage} = require('../Functions/clientController'); 
const { ClientProjectDetail  ,updateClientProjectDetail ,getClientProjectsByEventTypeClient  } = require('../Functions/clientprojectdetail');
const {addBuilderResponse , rejectBuilderResponse ,getRejectedNotifications ,acceptBuilderResponse ,getAcceptedProjectsByClientId ,getAcceptedProjectsByBuilderId ,markBuilderResponseComplete ,completeProject,
  rejectCompletedProject ,getBuilderNotifications ,addProjectRating ,getAllProjectsForBuilder,getCombinedProjects
} = require('../Functions/builderResponsecController');
const chatController = require('../Functions/chatController');
const router = express.Router();

//  request for builder signup
router.post('/signup-Builder', builderController); 
router.post('/login-Builder', loginBuilder);
router.get('/Builderlist', getAllBuilders);
router.put('/update-builder/:id', updateBuilder);
router.post('/change-builder-password', changeBuilderPassword);
router.delete('/delete-builder/:id', deleteBuilder);
router.post('/update-builder-image', updateBuilderImage);
router.delete('/remove-builder-image/:id', removeBuilderImage);

// POST request for builder signup
router.post('/signup-Client', ClientController);
router.post('/login-Client', loginClient);
router.get('/Clientlist', getAllClients);
router.put('/update-client/:id', updateClient);
router.post('/change-client-password', changeClientPassword);
router.delete('/delete-client/:id', deleteClient);
router.post('/update-client-image', updateClientImage);
router.delete('/remove-client-image/:id', removeClientImage);
router.get('/builder-completed-projects/:builderId', getCompletedProjectsForBuilder);
// post function for cloint project detail


// route to post project by client
router.post('/Client-Project-Detail', ClientProjectDetail); 
// route to add builder data in projects
router.put('/Client-Project-Detail/:id', updateClientProjectDetail);
// route to get projects by eventtype builder or client
router.get('/projects/client/:eventType', getClientProjectsByEventTypeClient);

// router post detail builder and project builder respoonse
router.post('/add-builder-response', addBuilderResponse);
// router to reject builder response
router.put('/update/:id', rejectBuilderResponse);
// router to get all projects by eventype builder
router.get('/rejected-notifications', getRejectedNotifications);
// router to Accept builder response
router.put('/accept/:id', acceptBuilderResponse);
// router to getAcceptedProjectsByClientId   
router.get('/accepted-projectsclientId/:clientId', getAcceptedProjectsByClientId);
// router to getAcceptedProjectsByBuilderId
router.get('/accepted-projectsbuilderId/:builderId', getAcceptedProjectsByBuilderId);
// Route to mark builder response as complete
router.put('/complete/:id', markBuilderResponseComplete);

// Route to complete a project
router.put('/complete-project/:id', completeProject);
router.get('/builder-notifications/:builderId', getBuilderNotifications);
// Route to reject a completed project
router.put('/rate-project/:id', addProjectRating);
router.put('/reject-completed-project/:id', rejectCompletedProject);
router.get('/projects/builder', getAllProjectsForBuilder);
router.get('/combined-projects', getCombinedProjects);


// Chat routes
router.get('/chat/messages', chatController.getMessages);
router.get('/chat/builders', chatController.getAllBuildersForChat);
router.post('/chat/send', chatController.sendMessage);
router.get('/chat/builder-clients/:builderId', chatController.getBuilderClients);
// Add this new route
router.get('/chat/builder-clients/:builderId', chatController.getBuilderClients);
router.get('/chat/user-chats/:userId/:userType', chatController.getUserChats);

module.exports = router;
 