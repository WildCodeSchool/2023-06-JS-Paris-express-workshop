const router = require('express').Router();

const tracks = require('./tracks/');
const albums = require('./albums/');
const users = require('./users/');

router.use("/tracks", tracks);
router.use("/albums", albums);
router.use("/users", users);

module.exports = router;
