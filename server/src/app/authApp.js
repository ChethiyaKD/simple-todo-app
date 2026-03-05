const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

const getAuthToken = async (req, res) => {
    try {
        const newUser = await UserModel.create({});

        const jwtToken = jwt.sign({ id: newUser._id }, config.JWT_SECRET);

        res.status(200).json({ message: "Token generated successfully", data: jwtToken });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { getAuthToken };