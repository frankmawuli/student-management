import { Router } from "express";
import { addCourse, enrollInCourse, getAllCourses, unenrollFromCourse } from "../controllers/course-controller.js";
const router = Router();




// Route to get all courses
router.get("/", getAllCourses);

// Route to create a new course
router.post("/new-course", addCourse);

// Route to  enroll in a course
router.post("/enroll", enrollInCourse);

//route to enroll in a curse 
router.post("/unenroll", unenrollFromCourse);


export default router;