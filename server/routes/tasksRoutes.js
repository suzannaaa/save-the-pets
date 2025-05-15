// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415

// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/tasksController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', jwtMiddleware.verifyToken, controller.readAllTasks);
router.get('/index', controller.readAllTasks);

router.post('/', jwtMiddleware.verifyToken, controller.createNewTask);

router.get('/:task_id', jwtMiddleware.verifyToken, controller.readTaskById);
router.put('/:task_id', jwtMiddleware.verifyToken, controller.updateTaskById);
router.delete('/:task_id', jwtMiddleware.verifyToken, controller.deleteTaskById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;