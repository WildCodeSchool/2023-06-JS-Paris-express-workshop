const { findAll, findById, findTracks, insertAlbum } = require('./albumsModel');

// ----------------------------------------------------------------------------------------

const getAll = (req, res) => {
  findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json('erreur serveur');
    });
};

// ----------------------------------------------------------------------------------------

const getOne = (req, res) => {
  const { id } = req.params;
  findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json('erreur serveur');
    });
};

// ----------------------------------------------------------------------------------------

const getTracksByAlbumId = (req, res) => {
  const { id } = req.params;
  findTracks(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json('erreur serveur');
    });
};

// ----------------------------------------------------------------------------------------

const postAlbums = (req, res) => {
  insertAlbum(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => {
      res.status(500).json('erreur serveur');
    });
};

// ----------------------------------------------------------------------------------------

const updateAlbums = (req, res) => {
  res.status(200).send('Update route is OK');
};

// ----------------------------------------------------------------------------------------

const deleteAlbums = (req, res) => {
  res.status(200).send('Delete route is Ok');
};

// ----------------------------------------------------------------------------------------

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
