const { validationResult  } = require('express-validator/check');

module.exports = (app) => {
    this.check = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }
        next();
    }
    return this;
}
