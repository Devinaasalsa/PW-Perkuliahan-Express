const express = require('express');
const EventController = require('../controllers/eventController.js')
const MiddlewareAdmin = require('../middleware/middlewareAdmin.js');

const router = express.Router();
const eventController = new EventController()
const middlewareAdmin = new MiddlewareAdmin();

// //routes role
router.get('/getListEvent', eventController.getAllEvent);
router.post('/createEvent', middlewareAdmin.isAdmin, eventController.createEvent);
router.patch('/updateEvent/:id', middlewareAdmin.isAdmin, eventController.updateEvent)
router.delete('/deleteEvent/:id', middlewareAdmin.isAdmin, eventController.deleteEvent)
router.get('/searchEvent?', eventController.searchEvent);

module.exports = router;
