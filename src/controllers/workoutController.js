const workoutService = require('../services/workoutService')

const getAllWorkouts = (req, res) => {
    const AllWorkouts = workoutService.getAllWorkouts();
    res.send({ status: 'OK', data: AllWorkouts });
};

const getOneWorkout = (req, res) => {
    const {
        params: { workoutId }
    } = req;

    if (!workoutId) {
        return;
    }
    const OneWorkout = workoutService.getOneWorkout(workoutId);
    res.send({ status: 'OK', data: OneWorkout });
};

const createNewWorkout = (req, res) => {
    const { body } = req;
    if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
                }
            });
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    };

    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: 'OK', data: createdWorkout });
};

const updateOneWorkout = (req, res) => {
    const {
      body,
      params: { workoutId },
    } = req;
    if (!workoutId) {
      return;
    }
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout });
  };

const deleteOneWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) {
        return;
    }
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};