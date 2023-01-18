const express = require('express');

const adminController = require('../controllers/admin.controller');
const auth = require('../utils/auth');

const router = express.Router();


router.route('/')
    .get(auth.isAdmin(), async (req, res) => {
        const admins = await adminController.getAll();

        if (!admins) {
            res.status(404).json();
        }

        res.status(200).json({message: "Voici les administrateurs du site : " + admins});
    })
    .put(auth.isAdmin(), async (req, res) => {
        const admin = await adminController.add(req.body);

        if (!admin) {
            res.status(404).json();
        }
        res.status(201).json(admin);
    })
    .post(auth.isAdmin(), async (req, res) => {
        const new_admin = await adminController.add(req.body);

        if (!new_admin) {
            res.status(404).json();
        }
        res.status(201).json(new_admin);
    })
;


router.route('/:id')
    .get(auth.isAdmin(), async (req, res) => {
        const admin = await adminController.getById(req.params.id);
            if (!admin) {
                res.status(404).json({message: "Aucun administrateur ne correspond à votre recherche."});
            }
            res.status(200).json(admin);
    })
    .delete(auth.isAdmin(), async (req, res) => {
        const admin = await adminController.remove(req.params.id);
        if (!admin) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;



module.exports = router;