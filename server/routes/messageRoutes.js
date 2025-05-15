//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const controller = require('../controllers/messageController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.get('/', jwtMiddleware.verifyToken, controller.readAllMessage);
router.post('/', jwtMiddleware.verifyToken, controller.createMessage);
router.get('/:id', jwtMiddleware.verifyToken, controller.readMessageById);
router.put('/:id', jwtMiddleware.verifyToken, controller.updateMessageById);
router.delete('/:id', jwtMiddleware.verifyToken, controller.deleteMessageById);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;