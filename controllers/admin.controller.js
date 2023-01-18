const db = require('../utils/db');
const bcrypt = require('bcrypt');


const getAll = async () => {
    const [admins, err] = await db.query("SELECT * FROM users WHERE role = ?", ["admin"]);
    return admins;
};


const add = async (data) => {
    const [admin, err] = await db.query("INSERT INTO users (email, password, name, pseudo, role) VALUES (?, ?, ?, ?, ?)",
    [data.email, hashedPassword, data.name, data.pseudo, 'admin']);

    if (!admin) {
        return null;
    }
    return admin;
};


const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM users WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};



module.exports = {
    getAll,
    add,
    remove
};