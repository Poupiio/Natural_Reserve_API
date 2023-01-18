const express = require('express');

// J'importe tous mes fichiers route.js contenus dans le dossier "routes"
const userRoute = require('./user.route');
const safariRoute = require('./safari.route');
const commentRoute = require('./comment.route');
const reservationRoute = require('./reservation.route');
const mediaRoute = require('./media.route');
const loginRoute = require('./login.route');
const signupRoute = require('./signup.route');
const adminRoute = require('./admin.route');


// J'importe le Routeur Express
const router = express.Router();


// Je pointe chaque entité vers sa sous-route :
// "http://localhost/api/users"
router.use('/users', userRoute);

// "http://localhost/api/safaris"
router.use('/safaris', safariRoute);

// "http://localhost/api/comments"
router.use('/comments', commentRoute);

// "http://localhost/api/reservations"
router.use('/reservations', reservationRoute);

// "http://localhost/api/medias"
router.use('/medias', mediaRoute);

// "http://localhost/api/login"
router.use('/login', loginRoute);

// "http://localhost/api/signup"
router.use('/signup', signupRoute);

// "http://localhost/api/admin"
router.use('/admin', adminRoute);


// J'exporte le router pour le rendre accessible en faisant un require de tout ce fichier
module.exports = router;