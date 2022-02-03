const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel");
const USER_TYPE = require("../constants/constants");

const TOKEN_EXPIRES_IN = "7h";

const signin = async (req, res) => {
    console.log("[signin]");

    const { email, password } = req.body;
    const emailLower = email.toLowerCase().replace(/\s/g, "");

    res.status(200).send("signin");
};
const signup = async (req, res) => {
    console.log("[signup]");
    const { email, password, confirmPassword, name } = req.body;
    const emailLower = email.toLowerCase().replace(/\s/g, "");

    try {
        // Get the user with that email
        const existingUser = await UserModel.findOne({ email: emailLower });
        if (existingUser) {
            console.log("User already exists.");
            return res.status(404).json({ message: "此電子郵件已使用", type: "error" });
        }

        if (!(name && email && password)) {
            console.log("Not fill in all blanks");
            return res.status(404).json({ message: "尚有空格未填寫", type: "error" });
        }

        if (password !== confirmPassword) {
            console.log("Passwords don't match");
            return res.status(400).json({ message: "密碼不一致", type: "error" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            email: emailLower,
            password: hashedPassword,
            name: name,
        });
        console.log("Create User Successful");

        return res.status(200).json({ message: "註冊成功", type: "success" });
    } catch (error) {
        console.log("ERROR at controllers/user.js/signup");
        console.log(error);
        return res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};

const deleteAll = async (req, res) => {
    try {
        await UserModel.deleteMany({});
        return res.status(200).json({ message: "成功刪除所有資料", type: "success" });
    } catch (error) {
        return res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};

const getAll = async (req, res) => {
    const { user_type, only_not_selected } = req.query;

    try {
        let users = await UserModel.find({});
        if (only_not_selected) {
            users = users.filter((user) => user.courses == undefined);
        }
        if (user_type) {
            users = users.filter((user) => user.userType === user_type);
        }
        console.log(users);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await UserModel.findById(id);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};

const modifyById = async (req, res) => {
    const updatedUser = req.body;
    const { id } = req.params;
    console.log(updatedUser);
    try {
        let user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).send("user not found");
        }
        user = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "發生錯誤", type: "error" });
    }
};

module.exports = {
    signin,
    signup,
    deleteAll,
    getAll,
    getById,
    modifyById,
};
