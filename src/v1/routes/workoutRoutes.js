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
 *     description: Obtiene una lista de todos los workouts. Puedes filtrar los resultados por el parámetro `mode` (e.g., "For Time", "AMRAP"). Este endpoint soporta el uso de caché por 2 minutos.
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: El modo de un workout (e.g., "For Time", "AMRAP")
 *     responses:
 *       200:
 *         description: Lista de workouts obtenida exitosamente
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
 *       400:
 *         description: Solicitud inválida (parámetros de consulta incorrectos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: "FAILED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string                     
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: "FAILED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Internal Server Error"
 */
router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);

/**
 * @openapi
 * /api/v1/workouts/{workoutId}:
 *   get:
 *     summary: Obtener un Workout por su ID
 *     tags:
 *       - Workouts
 *     description: Obtiene los detalles de un workout específico utilizando su ID único.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID único del workout que se desea obtener.
 *         example: "d8be2362-7b68-4ea4-a1f6-03f8bc4eede7"
 *     responses:
 *       200:
 *         description: Workout obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Workout"             
 *       400:
 *         description: Solicitud inválida, el ID del workout está mal formateado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: "FAILED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Invalid workout ID format"
 *       404:
 *         description: No se encontró el workout con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: "FAILED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Workout not found"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: "FAILED"
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Internal server error"
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
