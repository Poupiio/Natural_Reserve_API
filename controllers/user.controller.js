const db = require('../utils/db');
const bcrypt = require('bcrypt');


const getAll = async () => {
    const [users, err] = await db.query("SELECT id, email, name, pseudo FROM users");
    return users;
};


const getById = async (id) => {
    const [user, err] = await db.query("SELECT name, pseudo FROM users WHERE id = ?", [id]);
    if (!user) {
        return null;
    }
    return user[0];
};


const add = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [req, err] = await db.query("INSERT INTO users (email, password, name, pseudo, role) VALUES (?, ?, ?, ?, ?)",
        [data.email, hashedPassword, data.name, data.pseudo, 'user']);
    if (!req) {
        return null;
    }
    return getById(req.insertId);
};


const update = async (id, data) => {
    // Pour update, on va d'abord chercher en base le user correspondant
    const user = await getById(id);
    if (!user) {
        return null;
    } else {
        // Je vérifie que le mot de passe rentré par l'utilisateur correspond au hash
        let password;

        if (data.password) {
            password = await bcrypt.hash(data.password, 10);
        } else {
            password = user.password;
        }

        const [req, err] = await db.query("UPDATE users SET email = ?, password = ?, name = ?, pseudo = ? WHERE id = ? LIMIT 1",
            [
                data.email || user.email,
                password,
                data.name || user.name,
                data.pseudo || user.pseudo,
                id
            ]);
        if (!req) {
            return null;
        }

        return getById(id);
    }
};


const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM users WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};


const getByEmailAndPassword = async (data) => {
    const user = await getByEmail(data);

    if (!user) {
        return null;
    }

    const hashedPassword = await bcrypt.compare(data.password, user.password);

    if (hashedPassword) {
        return user;
    } else {
        return null;
    }
};


const getByEmail = async (data) => {
    const [user, err] = await db.query("SELECT email, password FROM users WHERE email = ?", [data.email]);
    if (!user || user.length == 0) {
        return null;
    }
    return user[0];
};


module.exports = {
    getAll,
    getById,
    add,
    update,
    remove,
    getByEmailAndPassword,
    getByEmail
};