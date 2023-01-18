const express = require('express');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user.controller');
const signupSchema = require('../models/signup');
const validator = require('../utils/validator');
const config = require('../config');

const router = express.Router();


router.route('/')
    .post(validator(signupSchema), async (req, res) => {
        // Je vérifie en BDD si un utilisateur existe déjà avec le mail renseigné
        const user = await userController.getByEmail(req.body);
        if (user) {
            res.status(400).json({ message: "Un compte avec cet email existe déjà" });
        } else {
            const new_user = await userController.add(req.body);

            const token = jwt.sign({
                id: new_user.id,
                email: new_user.email,
                role: new_user.role
            }, config.jwtPass, { expiresIn: config.jwtExpireLength });

            res.status(201).json({ message: "Utilisateur ajouté, voici son Token : " + token });
        }
    })
;


module.exports = router;