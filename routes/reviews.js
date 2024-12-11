const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews')
const catchAsync = require("../utilities/CatchAsync");
const { validateReview, isLoggedIn, isReviewOwner } = require('../middleware')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.new));

router.delete('/:reviewId', isLoggedIn, isReviewOwner, catchAsync(reviews.delete))

module.exports = router;