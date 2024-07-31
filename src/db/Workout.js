// const { deleteOneWorkout } = require('../services/workoutService');
const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllWorkouts = () => {
    return DB.workouts;
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex(
        (workout) => workout.name == newWorkout.name) > -1

    if (isAlreadyAdded) {
        return;
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
};

const getOneWorkout = (workoutId) => {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
        return;
    }
    return workout;
}

const updateOneWorkout = (workoutId, changes) => {
    if (!Array.isArray(DB.workout)) {
      throw new Error("DB.workout is not an array or is undefined");
    }
  
    const indexForUpdate = DB.workout.findIndex(
      (workout) => workout.id === workoutId
    );
  
    if (indexForUpdate === -1) {
      return null; // o alguna otra indicación de que no se encontró
    }
  
    const updatedWorkout = {
      ...DB.workout[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
  
    DB.workout[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  };

const deleteOneWorkout = (workoutId) => {
    const indexForDeleltion = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
    );

    if (indexForDeleltion === -1) {
        return;
    }

    DB.workouts.splice(indexForDeleltion, 1);
    saveToDatabase(DB);
}

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
};