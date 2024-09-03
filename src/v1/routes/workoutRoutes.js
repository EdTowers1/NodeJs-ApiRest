const express = require("express");
// const apicache = require("apicache");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");


const router = express.Router();
// const cache = apicache.middleware;

router
  // .get("/", cache("2 minutes"), workoutController.getAllWorkouts)
  .get("/", workoutController.getAllWorkouts)
  .get("/:workoutId", workoutController.getOneWorkout)
  .get("/:workoutId/records", recordController.getRecordForWorkout)
  .post("/", workoutController.createNewWorkout)
  .patch("/:workoutId", workoutController.updateOneWorkout)
  .delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
