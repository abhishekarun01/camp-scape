const express = require('express');
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utilities/CatchAsync')
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users')

router.route('/register')
    .get(users.registerPage)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.loginPage)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;    