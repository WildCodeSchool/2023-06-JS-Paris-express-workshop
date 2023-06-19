const router = require('express').Router();
const albums = require('./controller');
const albumSchema = require("./validator");

const { authenticate } = require("../../middlewares/auth");
const validate = require("../../middlewares/validator");

router.get('/', albums.getAll);
router.get('/:id', albums.getOne);
router.get('/:id/tracks', albums.getTracksByAlbumId);
router.post('/', authenticate, validate(albumSchema), albums.postAlbums);
router.put('/:id', authenticate, albums.updateAlbums);
router.delete('/:id', authenticate, albums.deleteAlbums);

module.exports = router;
