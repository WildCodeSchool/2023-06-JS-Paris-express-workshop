const {
  findAll,
  findById,
  insertTrack,
  deleteTrack,
  updateTrack,
} = require('./tracksModel');

// ----------------------------------------------------------------------------------------

const getOne = (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(([track]) => {
      !track
        ? res.status(400).json('ressource with the specified id does not exist')
        : res.status(200).json(track);
    })
    .catch(() => {
      res.status(500).json('erreur serveur');
    });
};
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

const postTracks = (req, res) => {
  insertTrack(req.body)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => {
      res.status(500).json('erreur serveur');
    });
};

// ----------------------------------------------------------------------------------------

const updateTracks = (req, res) => {
  const { id } = req.params;
  const track = req.body;

  updateTrack(track, id)
    .then((result) => {
      if (result.affectedRows === 1) {
        res.status(201).json({ id, ...track });
      } else {
        res.status(404).json({ message: 'No track found with this id !' });
      }
    })
    .catch(() => res.status(500).json({ message: 'Server error' }));
};

// ----------------------------------------------------------------------------------------

const deleteTracks = (req, res) => {
  const { id } = req.params;
  deleteTrack(id)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => {
      res.status(500).json('erreur serveur');
    });
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
