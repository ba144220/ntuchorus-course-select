const mongoose = require("mongoose");
const { USER_TYPE } = require("../constants/constants");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: USER_TYPE, default: USER_TYPE.USER },
    courses: {
        type: [String],
        default: undefined,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

var UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
