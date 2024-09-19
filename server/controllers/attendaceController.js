// volunteerModel.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



const attendSession = async (req, res) => {
  const sessionId  = Number(req.body.sessionId);
  const userId = Number(req.user.id); // Assume user ID is available from authentication middleware

  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    // Create attendance record
    const attendance = await prisma.attendance.create({
      data: {
        sessionId,
        userId,
      },
    });

    res.status(201).json(attendance);
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Error marking attendance', error: error.message });
  }
};

export default attendSession;