var mongoose = require('mongoose');

var UserReviewSchema = new mongoose.Schema({
    review: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // this may or may not be
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

var CourseRatingAndReviewsSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course',
            required: true
        },
        bestCourseReviews: [UserReviewSchema],
        rating: {
            type: Number,
            min: 0,
            max: 5
        }
    },
    { timestamps: true }
);

var Rating = mongoose.model('rating', CourseRatingAndReviewsSchema);
module.exports = Rating;
