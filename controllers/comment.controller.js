const db = require('../utils/db');


const getAll = async () => {
    const [comments, err] = await db.query("SELECT * FROM comments");
    return comments;
};


// ONLY ADMIN
const getById = async (id) => {
    const [comment, err] = await db.query("SELECT * FROM comments WHERE id = ?", [id]);
    if (!comment) {
        return null;
    }
    return comment[0];
};


const add = async (data) => {
    const [comment, err] = await db.query("INSERT INTO comments (content, posted_at, user_pseudo, safari_title) VALUES (?, NOW(), ?, ?)",
    [data.content, data.user_pseudo, data.safari_title]);

    if (!comment) {
        return null;
    }
    return comment;
};


// ONLY ADMIN
const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM comments WHERE id = ? LIMIT 1",[id]);
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