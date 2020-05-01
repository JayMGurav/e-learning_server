var mongoose = require('mongoose');

var SocialHandles = new mongoose.Schema({
    websiteHandle: {
        type: String
    },
    facebookHandle: {
        type: String
    },
    linkedinHandle: {
        type: String
    },
    instagramHandle: {
        type: String
    },
    twitterHandle: {
        type: String
    }
});

var instructorSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is a required ']
        },
        email: {
            type: String,
            required: [true, 'Email is the required '],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'password is required ']
        },
        name: {
            type: String
        },
        qualification: {
            type: String
        },
        profession: {
            type: String
        },
        bio: {
            type: String
        },
        avatar: {
            type: String
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'course'
            }
        ],
        socialHandles: SocialHandles
    },
    { timestamps: true }
);

var Instructor = mongoose.model('instructor', instructorSchema);

module.exports = Instructor;
