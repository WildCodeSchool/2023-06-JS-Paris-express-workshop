const router = require('express').Router();
const users = require('./controller');
const userSchema = require("./validator");

const { hashPassword, authenticate } = require("../../middlewares/auth");
const validate = require("../../middlewares/validator");

router.get('/', authenticate, users.getAll);
router.get('/:id', authenticate, users.getOneById);
router.post('/', validate(userSchema), hashPassword, users.postUsers);
router.post('/login', users.login);
router.put('/:id', authenticate, hashPassword, users.updateUsers);
router.delete('/:id', authenticate, users.deleteUsers);

module.exports = router;
