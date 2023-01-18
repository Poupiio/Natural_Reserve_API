const express = require('express');

const mediaController = require('../controllers/media.controller');
const auth = require('../utils/auth');

const router = express.Router();


router.route('/')
    .get(async (req, res) => {
        const medias = await mediaController.getAll();

        if (!medias) {
            res.status(404).json({message: "Il n'y a rien à afficher pour le moment."});
        }

        res.status(200).json(medias);
    })
    .put(auth.isAuth(), async (req, res) => {
        const media = await mediaController.add(req.body);

        if (!media) {
            res.status(404).json();
        }
        res.status(201).json(media);
    })
;


router.route('/:id')
    .delete(auth.isAdmin(), async (req, res) => {
        const media = await mediaController.remove(req.params.id);
        if (!media) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;



module.exports = router;
