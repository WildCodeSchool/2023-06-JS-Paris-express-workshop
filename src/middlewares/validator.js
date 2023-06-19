const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        (error) ? res.status(400).json("bad crédentials") : next();
    }
}

module.exports = validate;