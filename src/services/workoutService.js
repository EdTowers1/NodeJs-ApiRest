const { v4: uuid } = require('uuid');
const workout = require('../db/Workout');

const getAllWorkouts = () => {
    const allWorkouts = workout.getAllWorkouts();
    return allWorkouts;
};

const getOneWorkout = (workoutId) => {
    const OneWorkout = workout.getOneWorkout(workoutId);
    return OneWorkout;
};

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleDateString('en-US', { timeZone: 'UTC' }),
    };

    try {
        const createdWorkout = workout.createNewWorkout(workoutToInsert);
        return createdWorkout;
    } catch (error) {
        throw error;
    }
};

const updateOneWorkout = (workoutId, changes) => {
    const updatedWorkout = workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
    workout.deleteOneWorkout(workoutId);
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};