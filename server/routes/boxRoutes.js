//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const router = express.Router();

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const controller = require('../controllers/boxController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
// router.get('/', jwtMiddleware.verifyToken, controller.readAllBox);
router.get('/petworld', controller.readAllBox);
// router.post('/', controller.createNewPlayer);

router.get('/:box_id', controller.readBoxById);
// router.put('/:id', controller.updatePlayerById);
// router.delete('/:id', controller.deletePlayerById);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;