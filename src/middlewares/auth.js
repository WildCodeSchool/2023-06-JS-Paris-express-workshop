const argon = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = async (req, res, next) => {
    if (!req.body.password) return res.status(400).json("password field required");
    try {
        const hash = await argon.hash(req.body.password);
        req.body.password = hash;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json("error server");
    }
}

const authenticate = (req, res, next) => {
    try {
        const [type, token] = req.headers["authorization"].split(" ");

        if (type === "Bearer ") return res.status(401).json("Bad authorization header type");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json("invalid or expired token");
    }

}

module.exports = {hashPassword, authenticate};