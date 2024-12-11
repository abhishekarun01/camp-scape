if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const catchAsync = require("../utilities/CatchAsync");
const { isLoggedIn, isOwner, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });

const campgrounds = require('../controllers/campgrounds');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNew))

router.get('/new', isLoggedIn, catchAsync(campgrounds.newPage))

router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isOwner, upload.array('image'), validateCampground, catchAsync(campgrounds.edit))
    .delete(isLoggedIn, isOwner, catchAsync(campgrounds.delete))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgrounds.editPage))

module.exports = router;