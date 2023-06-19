const {findAll, findById, findTracksByAlbumId, create, updateOne, deleteOne} = require("./model");

const getAll = (req, res) => {
  findAll().then((albums) => res.status(200).json(albums))
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    }); 
};

const getOne = (req, res) => {
  findById(req.params.id).then(([album]) => {
      if(!album) return res.sendStatus(404);
      res.status(200).json(album);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const getTracksByAlbumId = (req, res) => {
  findTracksByAlbumId(req.params.id).then((tracks) => res.status(200).json(tracks))
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const postAlbums = (req, res) => {
  create(req.body).then((result) => res.status(201).json({id: result.insertId, ...req.body}))
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const updateAlbums = (req, res) => {
  updateOne(req.params.id, req.body).then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const deleteAlbums = (req, res) => {
  findById(req.params.id).then(([album]) => {
    if (!album) return res.sendStatus(404);
    deleteOne(req.params.id).then(() => res.sendStatus(204))
      .catch((err) => {
        console.error(err);
        res.status(500).json("error server");
      });
  })
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
