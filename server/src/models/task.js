const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
    created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);