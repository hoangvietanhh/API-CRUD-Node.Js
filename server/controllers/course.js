import mongoose from "mongoose";
import Course from '../models/course.js';

export function createCourse (req, res){
    const course = new Course({
        _id : mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    });

    return course.save().then((newCourse) => {
        return res.status(201).json({
            success: true,
            message: 'New cause created successfully',
            Course: newCourse,
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        })
    })
}

export function getAll(req, res){
    Course.find().select('_id title description').then((allCourse)=>{
        return res.status(200).json({
            success: true,
            message: 'A list of all course',
            Course: allCourse,
        });
    }).catch((err)=>{
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    })
}

export function getCourse(req, res){
    const id = req.params.courseId;
    Course.findById(id).then((oneCourse)=>{
        res.status(200).json({
            success: true,
            message: `More on ${oneCourse.title}`,
            Course: oneCourse,
        })
    }).catch((err)=>{
        res.status(500).json({
            success: false,
            message: 'This course does not exist',
            error: err.message,
        })
    })
}

export function updateCourse(req, res){
    const id = req.params.courseId;
    const courseNew = req.body;
    Course.update({_id:id}, {$set:courseNew}).exec().then(()=>{
        res.status(200).json({
            success: true,
            message: 'Course is updated',
            updateCourse: courseNew,
        })
    }).catch((err)=>{
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        })
    })
}

export function deleteCourse(req, res){
    const id = req.params.courseId;
    Course.findByIdAndDelete(id).exec().then(()=>{
        res.status(200).json({
            success: true,
            message: 'Course is delete',
        })
    }).catch((err) =>{
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
        })
    })
}