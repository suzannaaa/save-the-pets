// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415

// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/taskprogressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.post('/', jwtMiddleware.verifyToken, controller.checkUserExistence, controller.checkTaskExistence, controller.createNewProgress);

// router.get('/:progress_id', controller.readProgressById);
// router.put('/:progress_id', controller.updateProgressById);
// router.delete('/:progress_id', controller.deleteProgressById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;