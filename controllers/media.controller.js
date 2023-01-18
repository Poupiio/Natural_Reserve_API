const db = require('../utils/db');


const getAll = async () => {
    const [medias, err] = await db.query("SELECT * FROM medias");
    return medias;
};


// ONLY ADMIN
const getById = async (id) => {
    const [media, err] = await db.query("SELECT * FROM medias WHERE id = ?", [id]);
    if (!media) {
        return null;
    }
    return media[0];
};


// ONLY ADMIN
const add = async (data) => {
    const [media, err] = await db.query("INSERT INTO medias (name, type) VALUES (?, ?)", [data.name, data.type]);

    if (!media) {
        return null;
    }
    return media;
};


// ONLY ADMIN
const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM medias WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};



module.exports = {
    getAll,
    getById,
    add,
    remove
};