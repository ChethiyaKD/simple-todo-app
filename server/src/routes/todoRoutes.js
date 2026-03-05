const express = require("express");
const router = express.Router();

const { getAllTodo, createTodo, updateTodo, patchTodo, deleteTodo } = require("../app/todoApp");

router.route("/").get(getAllTodo).post(createTodo);
router.patch("/:id/done", patchTodo);

router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
