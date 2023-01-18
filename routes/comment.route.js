const express = require('express');

const commentController = require('../controllers/comment.controller');
const commentSchema = require('../models/comment');
const validate = require('../utils/validator');
const auth = require('../utils/auth');

const router = express.Router();


router.route('/')
    .get(async (req, res) => {
        const comments = await commentController.getAll();

        if (!comments) {
            res.status(404).json({message: "Il n'y a aucun commentaire pour le moment."});
        }

        res.status(200).json(comments);
    })
    // J'utilise mon middleware isAuth pour qu'un commentaire ne puisse être posté que par un utilisateur authentifié
    // Middleware validate pour valider le schéma de commentaire
    .put(auth.isAuth(), validate(commentSchema), async (req, res) => {
        const new_comment = await commentController.add(req.body);

        if (!new_comment) {
            res.json({message: "Veuillez appuyer sur 'Envoyer' pour poster votre commentaire."});
        }
        res.status(200).json(new_comment);
    })
;


router.route('/:id')
    .get(auth.isAdmin(), async (req, res) => {
        const comment = await commentController.getById(req.params.id);
            if (!comment) {
                res.status(404).json({message: "Aucun commentaire pour cette recherche."});
            }
            res.status(200).json(comment);
    })
    .delete(auth.isAdmin(), async (req, res) => {
        const comment = await commentController.remove(req.params.id);
        if (!comment) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;



module.exports = router;