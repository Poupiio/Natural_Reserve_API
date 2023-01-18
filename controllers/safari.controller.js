const db = require('../utils/db');


const getAll = async () => {
    const [safaris, err] = await db.query("SELECT * FROM safaris");
    return safaris;
};


// ONLY ADMIN
const getById = async (id) => {
    const [safari, err] = await db.query("SELECT * FROM safaris WHERE id = ?", [id]);
    if (!safari) {
        return null;
    }
    return safari[0];
};


// ONLY ADMIN
const add = async (data) => {
    const [safari, err] = await db.query("INSERT INTO safaris (date, nb_places, tarif, description, title) VALUES (?,?,?,?)", [data.date, data.nb_places, data.tarif, data.description, data.title]);

    if (!safari) {
        return null;
    }
    return safari;
};


// ONLY ADMIN
const update = async (id, data) => {
    const safari = await getById(id);
    if (!safari) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE safaris SET date = ?, nb_places = ?, tarif = ?, description = ?, title = ? WHERE id = ? LIMIT 1", 
        [
            data.date || safari.date, 
            data.nb_places || safari.nb_places,
            data.tarif || safari.tarif,
            data.description || safari.description,
            data.title || safari.title,
            id
        ]);

        return getById(id);
    }
};


// ONLY ADMIN
const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM safaris WHERE id = ? LIMIT 1", [id]);
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