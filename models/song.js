const db = require('../config/db');

const Song = {
    getAll: (callback) => {
        db.query('SELECT `id`, `title`, `artist`, `lyrics`, `music`, `image` FROM `playlist` WHERE 1', callback);
    },
    add: (songData, callback) => {
        db.query('INSERT INTO playlist SET ?', songData, callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM `playlist` WHERE id = ?', id, callback);
    },
    update: (id, songData, callback) => {
        db.query('UPDATE playlist SET ? WHERE id = ?', [songData, id], callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM playlist WHERE id = ?', [id], callback);
    },
};

module.exports = Song;
