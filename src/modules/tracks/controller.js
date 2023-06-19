const { findAll, findById, create, updateOne, deleteOne } = require("./model");

const getOne = (req, res) => {
  findById(req.params.id).then(([track]) => {
    if (!track) return res.sendStatus(404);
    res.status(200).json(track);
  })
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const getAll = (req, res) => {
  findAll().then((tracks) => res.status(200).json(tracks))
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const postTracks = (req, res) => {
  create(req.body).then((result) => res.status(201).json({ id: result.insertId, ...req.body }))
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const updateTracks = (req, res) => {
  updateOne(req.params.id, req.body).then(() => res.sendStatus(204))
    .catch((err) => {
      console.error(err);
      res.status(500).json("error server");
    });
};

const deleteTracks = (req, res) => {
  findById(req.params.id).then(([track]) => {
    if (!track) return res.sendStatus(404);
    deleteOne(req.params.id).then(() => res.sendStatus(204))
      .catch((err) => {
        console.error(err);
        res.status(500).json("error server");
      });
  })
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
