const { findAll, findById, create, updateOne, deleteOne, findByEmail } = require("./model");
const jwt = require("jsonwebtoken");
const argon = require("argon2");

const getOneById = async (req, res) => {
    try {
        const [user] = await findById(req.params.id);
        if (!user) return res.sendStatus(404);

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res) => {
    try {
        const [user] = await findByEmail(req.body.email);
        if(!user) return res.status(404).json("user not found");

        const result = await argon.verify(user.password, req.body.password);
        if(result) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({token});
        } 
        else {
            res.status(400).json("bad credentials");
        }    

    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res) => {
    try {
        const users = await findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const postUsers = async (req, res) => {
    try {
        const [result] = await create(req.body);
        delete req.body.password;
        delete req.body.repeat_password;
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        next(error);
    }
};

const updateUsers = async (req, res) => {
    try {
        await updateOne(req.params.id, req.body);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
};

const deleteUsers = async (req, res) => {
    try {
        const [user] = await findById(req.params.id)
        if (!user) return res.sendStatus(404);

        await deleteOne(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
};

module.exports = { getOneById, getAll, postUsers, updateUsers, deleteUsers, login };
