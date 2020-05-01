var mongoose = require('mongoose');

// Quiz schema
var Quiz = new mongoose.Schema({
    question: {
        type: String
    },
    options: [
        {
            type: String
        }
    ],
    answer: {
        type: String
    }
});

// //Each section has a set of videdos with this schema
var SectionContent = new mongoose.Schema({
    topicName: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoContentDetail: { type: String, required: true },
    sectionQuiz: Quiz
});

// //Course is the Array of SectionCourseContent
var CourseSectionContent = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title of thte section is required']
        },
        content: [SectionContent]
    },
    { timestamps: true }
);

//Schema of each Course
var courseSchema = new mongoose.Schema(
    {
        coursename: {
            type: String,
            required: [true, 'Name is the required field'],
            unique: true
        },
        topic: {
            type: String,
            required: [true, 'Topic is the required field']
        },
        image: {
            type: String
        },
        tags: [
            {
                type: String
                // required: [true, 'Tags are required']
            }
        ],
        level: {
            type: String,
            required: [true, 'level is required']
        },
        cost: {
            type: Number,
            required: [true, 'Cost is required field']
        },
        checkoutCost: {
            type: Number,
            required: [true, 'Cost is required field']
        },
        about: {
            type: String
        },
        boughtBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'instructor'
        },
        approxTimeToComplete: {
            type: String
        },
        skills: {
            type: [
                {
                    type: String
                }
            ]
        },
        courseContent: [CourseSectionContent],
        finalQuiz: [Quiz]
    },
    { timestamps: true }
);

var Course = mongoose.model('course', courseSchema);
module.exports = Course;
