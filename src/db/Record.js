const DB = require('./db.json');

/**
 * @openapi
 * components:
 *   schemas:
 *     Record:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique ID of the record
 *           example: ad75d475-ac57-44f4-a02a-8f6def58ff56
 *         workout:
 *           type: string
 *           description: The ID of the workout associated with this record
 *           example: 4a3d9aaa-608c-49a7-a004-66305ad4ab50
 *         record:
 *           type: string
 *           description: The performance result (e.g., "160 reps", "7:23 minutes")
 *           example: 160 reps
 *         memberId:
 *           type: string
 *           description: The ID of the member who achieved the record (optional)
 *           example: 11817fb1-03a1-4b4a-8d27-854ac893cf41
 *         member:
 *           type: string
 *           description: The URI of the member (optional)
 *           example: /members/:memberId
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date when the record was created
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date when the record was last updated
 *           example: 4/20/2022, 2:21:56 PM
 */
const getRecordForWorkout = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId);
        if (!record) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        return record;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = {
    getRecordForWorkout
};