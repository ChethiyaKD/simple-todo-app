const Joi = require('joi');

const createTodoSchema = Joi.object({
    title: Joi
        .string()
        .min(1)
        .required(),
    description: Joi.string()
})

const updateTodoSchema = Joi.object({
    title: Joi.string()
        .min(1)
        .required(),
    description: Joi.string()
})


module.exports = { createTodoSchema, updateTodoSchema };



