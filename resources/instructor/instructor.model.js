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
            required: [true, 'Username is a required feild']
        },
        email: {
            type: String,
            required: [true, 'Email is the required feild'],
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'password is required feil']
        },
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        qualification: {
            type: String,
            required: [true, 'Qualification is a required feild']
        },
        profession: {
            type: String
        },
        bio: {
            type: String,
            required: [true, 'Bio is required']
        },
        avatar: {
            type: String
        },
        gender: {
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
