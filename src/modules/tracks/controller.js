const { findAll, findById, create, updateOne, deleteOne } = require("./model");

const getOne = async (req, res) => {
  try {
    const [tracks] = await findById(req.params.id);
    if (!track) return res.sendStatus(404);

    res.status(200).json(track);
  } catch (error) {
    next(error);
  }
}

const getAll = async (req, res) => {
  try {
    const tracks = await findAll();
    res.status(200).json(tracks);
  } catch (error) {
    next(error);
  }
};

const postTracks = async (req, res) => {
  try {
    const result = await create(req.body);
    res.status(201).json({ id: result.insertId, ...req.body })
  } catch (error) {
    next(error);
  }
};

const updateTracks = async (req, res) => {
  try {
    await updateOne(req.params.id, req.body);
    res.sendStatus(204)
  } catch (error) {
    next(error);
  }
};

const deleteTracks = async (req, res) => {
  try {
    const [track] = await findById(req.params.id);
    if (!track) return res.sendStatus(404);

    await deleteOne(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { getOne, getAll, postTracks, updateTracks, deleteTracks };
