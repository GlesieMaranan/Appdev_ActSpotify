const Song = require('../models/song');

const songsController = {
    index: (req, res) => {
        Song.getAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('index', { songs: results });
        });
    },
    add: (req, res) => {
        res.render('add');
    },
    create: (req, res) => {
        const { title, artist, lyrics } = req.body;
        const newSong = {
            title,
            artist,
            lyrics,
            music: req.files.music[0].filename, // Get the uploaded audio file's filename
            image: req.files.image[0].filename, // Get the uploaded image file's filename
        };
        Song.add(newSong, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    
    delete: (req, res) => {
        const { id } = req.params;
        Song.delete(id, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    update: (req, res) => {
        const { title, artist, lyrics } = req.body;
        const { id } = req.params;

        const updatedSong = {
            title,
            artist,
            lyrics,
            music: req.file ? req.file.filename : null, // New file only if uploaded
            image: req.file ? req.file.filename : null, // New file only if uploaded
        };

        Song.getById(id, (err, existingSong) => {
            if (err) {
                return res.status(500).send(err);
            }

            // Retain old filenames if no new file is uploaded
            if (!updatedSong.music) {
                updatedSong.music = existingSong.music;
            }
            if (!updatedSong.image) {
                updatedSong.image = existingSong.image;
            }

            Song.update(id, updatedSong, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    },
    edit: (req, res) => {
        const { id } = req.params;
        Song.getById(id, (err, song) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            if (!song) {
                return res.status(404).send("Song not found");
            }
            res.render('edit', { song });
        });
    },
};

module.exports = songsController;
