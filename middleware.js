const Campground = require('./models/campground');
const Review = require('./models/reviews');
const ExpressError = require("./utilities/ExpressError");
const { campgroundSchema, reviewSchema } = require('./schemas');


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be logged in')
        return res.redirect('/login')
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }

    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else {
        next();
    }
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to delete this campground.')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewOwner = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to delete this campground.')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}