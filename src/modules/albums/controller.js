const {findAll, findById, findTracksByAlbumId, create, updateOne, deleteOne} = require("./model");

const getAll = async (req, res) => {
  try {
    const albums = await findAll();
    res.status(200).json(albums)
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res) => {
  try {
    const [album] = await findById(req.params.id);
    if (!album) return res.sendStatus(404);

    res.status(200).json(album);
  } catch (error) {
    next(error);
  }
};

const getTracksByAlbumId = async (req, res) => {
  try {
    const tracks = await findTracksByAlbumId(req.params.id);
    res.status(200).json(tracks)
  } catch (error) {
    next(error); 
  }
};

const postAlbums = async (req, res) => {
  try {
    const result = await create(req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    next(error);
  }
};

const updateAlbums = async (req, res) => {
  try {
    await updateOne(req.params.id, req.body);
    res.sendStatus(204)
  } catch (error) {
    next(error);
  }
};

const deleteAlbums = async (req, res) => {
  try {
    const [album] = await findById(req.params.id);
    if (!album) return res.sendStatus(404);

    await deleteOne(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  getTracksByAlbumId,
  postAlbums,
  updateAlbums,
  deleteAlbums,
};
