import express from "express";
import {createCourse,getAll,getCourse,updateCourse,deleteCourse} from "../controllers/course.js";

const router = express.Router();

router.post('/courses', createCourse);

router.get('/courses', getAll);

router.get('/courses/:courseId',getCourse);

router.put('/courses/:courseId', updateCourse);

router.delete('/courses/:courseId', deleteCourse);

export default router;