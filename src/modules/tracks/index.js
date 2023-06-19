const router = require('express').Router();
const tracks = require('./controller');
const trackSchema = require("./validator");

const { authenticate } = require("../../middlewares/auth");
const validate = require("../../middlewares/validator");

router.get('/', tracks.getAll);
router.get('/:id', tracks.getOne);
router.post('/', authenticate, validate(trackSchema), tracks.postTracks);
router.put('/:id', authenticate, tracks.updateTracks);
router.delete('/:id', authenticate, tracks.deleteTracks);

module.exports = router;
