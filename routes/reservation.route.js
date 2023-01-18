const express = require('express');

const reservationController = require('../controllers/reservation.controller');
const resaSchema = require('../models/reservation');
const validate = require('../utils/validator');
const auth = require('../utils/auth');

const router = express.Router();


router.route('/')
    .get(async (req, res) => {
        const reservations = await reservationController.getAll();

        if (!reservations) {
            res.status(404).json({message: "Il n'y a aucune réservation pour le moment."});
        }

        res.status(200).json(reservations);
    })
    .post(validate(resaSchema), async (req, res) => {
        const new_resa = await reservationController.add(req.body);

        if (!new_resa) {
            res.json({message: "Veuillez appuyer sur 'Envoyer' pour poster votre commentaire."});
        }
        res.status(200).json(new_resa);
    })
;


router.route('/:id')
    .get(auth.isAdmin(), async (req, res) => {
        const reservation = await reservationController.getById(req.params.id);
            if (!reservation) {
                res.status(404).json({message: "Aucune reservation pour cette recherche."});
            }
            res.status(200).json(reservation);
    })
    .delete(auth.isAuth(), async (req, res) => {
        const reservation = await reservationController.remove(req.params.id);
        if (!reservation) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;



module.exports = router;