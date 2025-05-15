// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415

// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/petshopController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', jwtMiddleware.verifyToken, controller.readAllPetShop);
router.get('/index', controller.readAllPetShop);

// router.post('/', controller.createNewBox);

// router.get('/:box_id', controller.readBoxById);
// router.put('/:box_id', controller.updateBoxById);
// router.delete('/:box_id', controller.deleteBoxById);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;