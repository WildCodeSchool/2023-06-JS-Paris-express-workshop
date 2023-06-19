const db = require("../../config/database");

const findAll = () => {
    return db.query("SELECT * FROM users").then(([users]) => users);
}

const findById = (id) => {
    return db.query("SELECT * FROM users WHERE id = ?", [id]).then(([user]) => user);
}

const findByEmail = (email) => {
    return db.query("SELECT * FROM users WHERE email = ?", [email]).then(([user]) => user);
}

const create = (users) => {
    const { username, email, password } = users;
    return db.query("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, password])
        .then(([result]) => result);
}

const updateOne = (id, users) => {
    return db.query("UPDATE users set ? WHERE id = ?", [users, id])
        .then(([result]) => result);
}

const deleteOne = (id) => {
    return db.query("DELETE FROM users WHERE id = ?", [id])
        .then(([result]) => result);
}

module.exports = { findAll, findById, findByEmail, create, updateOne, deleteOne };