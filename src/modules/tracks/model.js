const db = require("../../config/database");

const findAll = () => {
    return db.query("SELECT * FROM track").then(([tracks]) => tracks);
}

const findById = (id) => {
    return db.query("SELECT * FROM track WHERE id = ?", [id]).then(([track]) => track);
}

const create = (track) => {
    const { title, youtube_url, id_album } = track;
    return db.query("INSERT INTO track (title, youtube_url, id_album) VALUES (?,?,?)", [title, youtube_url, id_album])
        .then(([result]) => result);
}

const updateOne = (id, track) => {
    return db.query("UPDATE track set ? WHERE id = ?", [track, id])
        .then(([result]) => result);
}

const deleteOne = (id) => {
    return db.query("DELETE FROM track WHERE id = ?", [id])
        .then(([result]) => result);
}

module.exports = { findAll, findById, create, updateOne, deleteOne };