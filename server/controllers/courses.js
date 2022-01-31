const mongoose = require("mongoose");
const CourseModel = require("../models/courseModel");

const addCourses = async (req, res) => {
    const courses = req.body;
    try {
        await CourseModel.insertMany(courses);
        return res.status(200).send("success");
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getCourses = async (req, res) => {
    try {
        const data = await CourseModel.find({});
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).send(error);
    }
};
const getCourse = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await CourseModel.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const deleteAllCourses = async (req, res) => {
    try {
        await CourseModel.deleteMany({});
        return res.status(200).send("success");
    } catch (error) {
        return res.status(500).send(error);
    }
};
const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(500).send("bad request");
        }
        const dataToBeDeleted = await CourseModel.deleteOne({ _id: id });
        if (dataToBeDeleted.deletedCount === 0) {
            return res.status(500).send("no data");
        }
        return res.status(200).send("success");
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    addCourses,
    getCourses,
    getCourse,
    deleteAllCourses,
    deleteCourse,
};
