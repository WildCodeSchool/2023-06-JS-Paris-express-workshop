const db = require("../../../db-config");

const findAll = () => {
    return db.query("SELECT * FROM albums").then(([albums]) => albums);
}

const findById = (id) => {
    return db.query("SELECT * FROM albums WHERE id = ?", [id]).then(([album]) => album);
}

const findTracksByAlbumId = (id) => {
    return db.query("SELECT * FROM track WHERE id_album = ?", [id]).then(([tracks]) => tracks);
}

const create = (album) => {
    const {title, genre, picture, artist} = album;
    return db.query("INSERT INTO albums (title, genre, picture, artist) VALUES (?,?,?,?)", [title, genre, picture, artist])
    .then(([result]) => result);
}

const updateOne = (id, album) => {
    return db.query("UPDATE albums set ? WHERE id = ?",[album, id])
    .then(([result]) => result);
}

const deleteOne = (id) => {
    return db.query("DELETE FROM albums WHERE id = ?", [id])
    .then(([result]) => result);
}

module.exports = {findAll, findById, findTracksByAlbumId, create, updateOne, deleteOne};