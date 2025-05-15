// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415

// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const boxController = require('../controllers/boxController');
const controller = require('../controllers/petController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', jwtMiddleware.verifyToken, controller.readAllPet);
router.post('/', jwtMiddleware.verifyToken, boxController.checkPointsByBox, boxController.updatePointsByBox, boxController.getRandomPet, controller.createPet, controller.readPetById);

router.get('/:id', jwtMiddleware.verifyToken, controller.readPetById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;