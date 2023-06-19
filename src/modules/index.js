const { Router } = require('express');

const tracks = require('./tracks/controller');
const albums = require('./albums/controller');
const users = require('./users/controller');

const {hashPassword, authenticate} = require("../middlewares/auth");

const router = Router();

router.get('/albums', albums.getAll);
router.get('/albums/:id', albums.getOne);
router.get('/albums/:id/tracks', albums.getTracksByAlbumId);
router.post('/albums', authenticate, albums.postAlbums);
router.put('/albums/:id', authenticate, albums.updateAlbums);
router.delete('/albums/:id',authenticate,  albums.deleteAlbums);

router.get('/tracks', tracks.getAll);
router.get('/tracks/:id', tracks.getOne);
router.post('/tracks',authenticate,  tracks.postTracks);
router.put('/tracks/:id',authenticate,  tracks.updateTracks);
router.delete('/tracks/:id',authenticate,  tracks.deleteTracks);

router.get('/users', authenticate, users.getAll);
router.get('/users/:id', users.getOneById);
router.post('/users',authenticate, hashPassword, users.postUsers);
router.post('/users/login', users.login);
router.put('/users/:id',authenticate,  hashPassword, users.updateUsers);
router.delete('/users/:id',authenticate, users.deleteUsers);

module.exports = router;
