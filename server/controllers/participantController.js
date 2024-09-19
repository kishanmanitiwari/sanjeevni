// controllers/participantController.js
import * as participantModel from '../models/participant.js';

// GET /participants: View list of participants (with optional filters)
export const getAllParticipants = async (req, res) => {
    try {
        const filters = req.query; // Optional filters from query params
        const participants = await participantModel.getAllParticipants(filters);
        res.json(participants);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving participants', error });
    }
};

// POST /participants: Create a new participant
export const createParticipant = async (req, res) => {
    const { userId, dob, gender, address, age, marital_status, rounds_changing, mentor, current_level, native_city, otp, email } = req.body;
    
    if (!userId || !dob || !gender || !address || !age || !marital_status || !rounds_changing || !mentor || !current_level || !native_city || !email) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Check if the user exists
        const existingUser = await participantModel.findUserById(userId);
        if (!existingUser) {
            return res.status(400).send('User not found.');
        }

        const newParticipant = await participantModel.createParticipant({
            userId,
            dob,
            gender,
            address,
            age,
            marital_status,
            rounds_changing,
            mentor,
            current_level,
            native_city,
            otp, // Optional
            email
        });
        res.status(201).json(newParticipant);
    } catch (error) {
        res.status(500).json({ message: 'Error creating participant', error });
    }
};

// GET /participants/:id: Get a specific participant by ID
export const getParticipantById = async (req, res) => {
    const { id } = req.params;

    try {
        const participant = await participantModel.getParticipantById(id);
        if (!participant) {
            return res.status(404).json({ message: 'Participant not found' });
        }
        res.json(participant);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving participant', error });
    }
};

// PUT /participants/:id: Update participant details
export const updateParticipant = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedParticipant = await participantModel.updateParticipant(id, updatedData);
        if (!updatedParticipant) {
            return res.status(404).json({ message: 'Participant not found' });
        }
        res.json(updatedParticipant);
    } catch (error) {
        res.status(500).json({ message: 'Error updating participant', error });
    }
};

// DELETE /participants/:id: Delete a participant
export const deleteParticipant = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedParticipant = await participantModel.deleteParticipant(id);
        if (!deletedParticipant) {
            return res.status(404).json({ message: 'Participant not found' });
        }
        res.json({ message: `Participant with ID ${id} has been deleted` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting participant', error });
    }
};
