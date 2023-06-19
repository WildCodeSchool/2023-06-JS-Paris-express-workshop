const { findAll, findById, create, updateOne, deleteOne, findByEmail } = require("./model");
const {verifyPassword} = require("../../helpers/auth");
const jwt = require("jsonwebtoken");

const getOneById = (req, res) => {
    findById(req.params.id).then(([user]) => {
        if (!user) return res.sendStatus(404);
        res.status(200).json(user);
    })
        .catch((err) => {
            console.error(err);
            res.status(500).json("error server");
        });
};

const login = async (req, res) => {
    try {
        const [user] = await findByEmail(req.body.email);
        if(!user) return res.status(404).json("user not found");

        const result = await verifyPassword(user.password, req.body.password);
        if(result) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({token});
        } else {
            res.status(400).json("bad credentials");
        }    

    } catch (error) {
        console.error(error);
        res.status(500).json("error server");
    }
}

const getAll = (req, res) => {
    if (req.query.email) {
        findByEmail(req.query.email).then(([user]) => {
            if (!user) return res.sendStatus(404);
            res.status(200).json(user);
        })
            .catch((err) => {
                console.error(err);
                res.status(500).json("error server");
            });
    } else {
        findAll().then((users) => res.status(200).json(users))
            .catch((err) => {
                console.error(err);
                res.status(500).json("error server");
            });
    }
    
};

const postUsers = (req, res) => {
    create(req.body).then((result) => res.status(201).json({ id: result.insertId, ...req.body }))
        .catch((err) => {
            console.error(err);
            res.status(500).json("error server");
        });
};

const updateUsers = (req, res) => {
    updateOne(req.params.id, req.body).then(() => res.sendStatus(204))
        .catch((err) => {
            console.error(err);
            res.status(500).json("error server");
        });
};

const deleteUsers = (req, res) => {
    findById(req.params.id).then(([user]) => {
        if (!user) return res.sendStatus(404);
        deleteOne(req.params.id).then(() => res.sendStatus(204))
            .catch((err) => {
                console.error(err);
                res.status(500).json("error server");
            });
    })
};

module.exports = { getOneById, getAll, postUsers, updateUsers, deleteUsers, login };
