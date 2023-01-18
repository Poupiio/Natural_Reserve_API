const express = require('express');

const userController = require('../controllers/user.controller');
const auth = require('../utils/auth');

const router = express.Router();


router.route('/')
    .get(auth.isAdmin(), async (req, res) => {
        const users = await userController.getAll();

        if (!users) {
            res.status(404).json({message: "Aucun utilisateur enregistré pour le moment."});
        }
        
        res.status(200).json(users);
    })
    .post(async (req, res) => {
        const new_user = await userController.add(req.body);

        if (!new_user) {
            res.status(404).json();
        }
        res.status(201).json(new_user);
    })
;


router.route('/:id')
    .get(auth.isAdmin(), async (req, res) => {
        const user = await userController.getById(req.params.id);
            if (!user) {
                res.status(404).json({message: "L'utilisateur que vous recherchez n'existe pas."});
            }

            res.status(200).json(user);
    })
    .patch(auth.isAuth(), async (req, res) => {
        const user = await userController.getById(req.params.id);

        if (!user) {
            res.status(404).json();
        } else {
            const updated_user = await userController.update(req.params.id, req.body);
            if (!updated_user) {
                res.status(404).json({message: "L'utilisateur recherché n'existe pas."});
            }
            res.status(202).json({message: "L'utilisateur a bien été modifié : " + updated_user});
        }
    })
    .delete(auth.isAdmin(), async (req, res) => {
        const user = await userController.remove(req.params.id);
        if (!user) {
            res.status(404).json();
        }
        res.status(202).json({message: "L'utilisateur sélectionné a bien été supprimé."});
    })
;


router.route('/admin')
    .post(auth.isAdmin(), async (req, res) => {
        const new_admin = await userController.addAdmin(req.body);

        if (!new_user) {
            res.status(404).json();
        }
        res.status(201).json(new_admin);
    })
;


module.exports = router;