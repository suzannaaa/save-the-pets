// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const express = require('express');

const usersRoutes = require('./usersRoutes');
const tasksRoutes = require('./tasksRoutes');
const taskprogressRoutes = require('./taskprogressRoutes');
const messageRoutes = require('./messageRoutes');
const petshopRoutes = require('./petshopRoutes');
const boxRoutes = require('./boxRoutes');
const petRoutes = require('./petRoutes');

const usersController = require('../controllers/usersController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');

// ##############################################################
// CREATE ROUTER
// ##############################################################
const router = express.Router();

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.use("/users", usersRoutes);
router.use("/tasks", tasksRoutes);
router.use("/task_progress", taskprogressRoutes);
router.use("/message", messageRoutes);
router.use("/pet_shop", petshopRoutes);
router.use("/box", boxRoutes);
router.use("/pets", petRoutes);

router.post("/login", usersController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", usersController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, usersController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router;