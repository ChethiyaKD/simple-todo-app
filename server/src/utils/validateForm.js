
const validateForm = (data, schema) => {
    const { error } = schema.validate(data);
    return !!error
}

module.exports = validateForm;