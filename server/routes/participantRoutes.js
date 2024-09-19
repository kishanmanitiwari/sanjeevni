import express from 'express';
import * as participantController from '../controllers/participantController.js';

const router = express.Router();

// GET /participants: View list of participants (with optional filters)
router.get('/participants', participantController.getAllParticipants);

// POST /participants: Create a new participant
router.post('/participants', participantController.createParticipant);

// GET /participants/:id: Get a specific participant by ID
router.get('/participants/:id', participantController.getParticipantById);

// PUT /participants/:id: Update participant details
router.put('/participants/:id', participantController.updateParticipant);

// DELETE /participants/:id: Delete a participant
router.delete('/participants/:id', participantController.deleteParticipant);

export default router;
