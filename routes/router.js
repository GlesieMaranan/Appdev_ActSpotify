const express = require('express');
const multer = require('multer');
const router = express.Router();
const songsController = require('../controller/songController');

// Setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'music') {
            cb(null, 'public/audio'); // For audio files
        } else if (file.fieldname === 'image') {
            cb(null, 'public/images'); // For image files
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Save file with the original name
    }
});

const upload = multer({ storage: storage });

router.get('/', songsController.index);
router.get('/add', songsController.add);
router.post('/add', upload.fields([{ name: 'music' }, { name: 'image' }]), songsController.create);
router.get('/edit/:id', songsController.edit);
router.post('/edit/:id', upload.fields([{ name: 'music' }, { name: 'image' }]), songsController.update);
router.post('/delete/:id', songsController.delete);

module.exports = router;
