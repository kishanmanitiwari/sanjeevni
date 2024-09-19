
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const enrollInCourse = async (req, res) => {
    const courseId  = Number(req.body.courseId);
    const userId = Number(req.user.id); // Assume user ID is available from authentication middleware
  
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }
  
    try {
      // Create enrollment record
      const enrollment = await prisma.enrollment.create({
        data: {
          userId,
          courseId,
        },
      });
  
      res.status(201).json(enrollment);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      res.status(500).json({ message: 'Error enrolling in course', error: error.message });
    }
  };
  
  export default enrollInCourse;