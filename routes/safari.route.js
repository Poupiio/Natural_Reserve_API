const express = require('express');

const safariController = require('../controllers/safari.controller');
const validator = require('../utils/validator');
const auth = require('../utils/auth');

const router = express.Router();


router.route('/')
    .get(async (req, res) => {
        const safaris = await safariController.getAll();

        if (!safaris) {
            res.status(404).json({message: "Il n'y a aucun safari disponible pour le moment."});
        }

        res.status(200).json(safaris);
    })
    .put(auth.isAdmin(), async (req, res) => {
        const safari = await safariController.add(req.body);

        if (!safari) {
            res.status(404).json();
        }
        res.status(201).json(safari);
    })
;


router.route('/:id')
    .get(auth.isAdmin(), async (req, res) => {
        const safari = await safariController.getById(req.params.id);
            if (!safari) {
                res.status(404).json({message: "Le safari que vous recherchez n'existe pas."});
            }
            res.status(200).json(safari);
    })
    .patch(auth.isAdmin(), async (req, res) => {
        const safari = await safariController.getById(req.params.id);

        if (!safari) {
            res.status(404).json();
        } else {
            const updated_safari = await safariController.update(req.params.id, req.body);
            if (!updated_safari) {
                res.status(404).json();
            }
            res.status(202).json(updated_safari);
        }
    })
    .delete(auth.isAdmin(), async (req, res) => {
        const safari = await safariController.remove(req.params.id);
        if (!safari) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;


module.exports = router;