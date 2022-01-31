const mongoose = require("mongoose");
const { DAY_TYPE } = require("../constants/constants");

const courseSchema = mongoose.Schema({
    day: { type: String, enum: DAY_TYPE, required: true },
    teacher: { type: String, required: true },
    startTime: { type: String, required: true },
    finishTime: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

var CourseModel = mongoose.model("courses", courseSchema);

module.exports = CourseModel;
