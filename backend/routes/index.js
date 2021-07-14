const router = require("express").Router();
const allMeetsController = require("../controllers/allMeetsController");
// const gMeetController = require("../controllers/gMeetHandler");
// const teamsController = require("../controllers/teamsHandler");
// const zoomController = require("../controllers/zoomHandler");

// show all the meets
router.get('/meets', allMeetsController.getAll);

// delete meet by id, query: type
router.delete('/meets/:id', allMeetsController.delete);

// create meet , query: type
router.post('/meets', allMeetsController.create);

module.exports = router;