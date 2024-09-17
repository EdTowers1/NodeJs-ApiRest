const express = require("express");
const apicache = require("apicache");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

const router = express.Router();
const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     summary: Obtener todos los Workouts
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: The mode of a workout
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   get:
 *    summary: Obtener Workout por ID
 *    tags:
 *       - Workouts
 *    parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of a workout
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Workout"
 *      404:
 *        description: Workout not found
 *      500:
 *        description: Server error
 *      
 */
router.get("/:workoutId", workoutController.getOneWorkout);

/**
 * @openapi
 * /api/v1/workouts/{workoutId}/records:
 *   get:
 *    summary: Obtener records de un Workout por ID
 *    tags:
 *       - Workouts
 *    parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of a workout
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Record"
 *      404:
 *        description: Workout not found
 *      500:
 *        description: Server error
 *  
 */
router.get("/:workoutId/records", recordController.getRecordForWorkout);

/**
 * @openapi
 * /api/v1/workouts:
 *   post:
 *    summary: Agregar un nuevo workout
 *    tags: 
 *       - Workouts
 *    description: Agregar un nuevo workout
 *    requestBody:
 *      description: Crear un nuevo workout
 *      content:
 *         application/json:
 *            schema:
 *              $ref: "#/components/schemas/Workout"
 *      required: true
 *    responses:
 *      200:
 *        description: Workout creado con éxito
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Workout"
 *      404:
 *        description: Workout not found
 *      500:
 *        description: Server error
 */
router.post("/", workoutController.createNewWorkout);

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   patch:
 *    summary: Actualizar un workout existente
 *    tags:
 *       - Workouts
 *    description: Actualizar un workout existente mediante su ID
 *    parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of a workout
 *    requestBody:
 *      description: campos a actualizar en el workout
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Workout"
 *          example:
 *             name: "Heavy DT"
 *             mode: "5 Rounds For Time"
 *             equipment: ["barbell", "rope"]
 *             exercises: [
 *               "12 deadlifts",
 *               "9 hang power cleans",
 *               "6 push jerks"
 *             ]
 *             trainerTips: [
 *               "Break the exercises into sets if needed",
 *               "Stay consistent with your pace"
 *             ]
 *    responses:
 *       200:
 *         description: Workout actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       400:
 *         description: Solicitud incorrecta o datos inválidos
 *       404:
 *         description: No se encontró el workout con el ID especificado
 *       500:
 *         description: Error interno del servidor
 * 
*/
router.patch("/:workoutId", workoutController.updateOneWorkout);

/**
 *  @openapi
 * /api/v1/workouts/{workoutId}:
 *   delete:
 *    summary: Eliminar un workout
 *    tags:
 *       - Workouts
 *    description: Eliminar un workout mediante su ID
 *    parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of a workout
*    responses:
 *      200:
 *        description: OK
 *        
 *      404:
 *        description: Workout not found
 *      500:
 *        description: Server error
 */
router.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
