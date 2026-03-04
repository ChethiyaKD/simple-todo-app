const express = require("express");
const router = express.Router();

const { getAuthToken } = require("../app/authApp");

router.get("/", getAuthToken);

module.exports = router;
