// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415

// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');
const controller = require('../controllers/usersController');
const jwtMiddleware = require('../middlewares/jwtMiddleware')

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
// router.put('/:id', controller.updateUserById);
// router.delete('/:id', controller.deleteUserById);

// router.get('/:user_id/player/:pet_id', controller.readPetByUser);
router.get('/:id', jwtMiddleware.verifyToken, controller.readUserById);
// router.get('/', controller.readAllUser);

// router.post('/', controller.createNewUser);

// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;