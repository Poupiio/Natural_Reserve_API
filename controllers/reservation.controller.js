const db = require('../utils/db');


const getAll = async () => {
    const [reservations, err] = await db.query("SELECT * FROM reservations");
    return reservations;
};


// ONLY ADMIN
const getById = async (id) => {
    const [reservation, err] = await db.query("SELECT * FROM reservations WHERE id = ?", [id]);
    if (!reservation) {
        return null;
    }
    return reservation[0];
};


const add = async (data) => {
    const [reservation, err] = await db.query("INSERT INTO reservations (nb_places, user_name, safari_title, user_email) VALUES (?, ?, ?, ?)", [data.nb_places, data.user_name, data.safari_title, data.user_email]);

    if (!reservation) {
        return null;
    }
    return reservation;
};


const update = async (id, data) => {
    const resa = await getById(id);
    if (!resa) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE reservations SET nb_places = ?, user_name = ?, safari_title = ?, user_email = ? WHERE id = ? LIMIT 1", 
        [
            data.nb_places || resa.nb_places,
            data.user_name || resa.user_name,
            data.safari_title || resa.safari_title,
            data.user_email || resa.user_email,
            id
        ]);

        return getById(id);
    }
};


const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM reservations WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};



module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
};