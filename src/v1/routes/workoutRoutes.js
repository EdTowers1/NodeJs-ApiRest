const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        res.send('Get all workouts');
    })

    .get('/:workoutId', (req, res) => {
        res.send(`Get workout ${req.params.workoutId}`);
    })

    .post('/:workoutId', (req, res) => {
        res.send(`Create workout ${req.params.workoutId}`);
    })

    .patch('/:workoutId', (req, res) => {
        res.send(`Update workout ${req.params.workoutId}`)
    })

    .delete('/:workoutId', (req, res) => {
        res.send(`Delete workout ${req.params.workoutId}`)
    });

module.exports = router;
