const argon = require("argon2");

const verifyPassword = async (hashPassword, password) => {
    try {
        const result = await argon.verify(hashPassword, password);
        return (result) ? true : false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {verifyPassword};