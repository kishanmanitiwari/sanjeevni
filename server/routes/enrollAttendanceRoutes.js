import express from "express";
import attendSession from "../controllers/attendaceController.js";
import enrollInCourse from "../controllers/enrollmentController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();


router.post("/enroll",authenticate, enrollInCourse);
router.post("/attend-session",authenticate, attendSession);

export default router;
