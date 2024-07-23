const DB = require('./db.json');
const {saveToDatabase } = require('./utils');

const getAllWorkouts = () => {
    return DB.workouts;
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name == newWorkout.name)
}
    
module.exports = {
    getAllWorkouts
};