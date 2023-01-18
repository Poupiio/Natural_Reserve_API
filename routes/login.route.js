const express = require('express');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user.controller');
const loginSchema = require('../models/login');
const validator = require('../utils/validator');
const config = require('../config');

const router = express.Router();


router.route('/')
    .post(validator(loginSchema), async (req, res) => {
        // Je vérifie si un utilisateur existe en base avec cet email et ce mot de passe en utilisant la fonction getByEmailAndPassword()
        let user = await userController.getByEmailAndPassword(req.body);

        if (!user) {
            res.status(401).json({ message: "Combinaison email/password incorrecte" });
        } else {
            // Je créé un JWT qui contient le mail, role, et l'id du user
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            }, config.jwtPass, { expiresIn: config.jwtExpireLength });

            res.json({
                access_token: token
            });
        }
    })
;


module.exports = router;