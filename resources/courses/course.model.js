var mongoose = require('mongoose');

// Details of each section
// var SectionDetails = new mongoose.Schema({
//     timeToComplete: {
//         type: Number
//         // required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     detail: {
//         type: String
//         // required: true
//     },
//     numberOfVideos: {
//         type: Number
//         // required: true
//     },
//     numberOfReadings: {
//         type: Number
//         // required: true
//     },
//     numberOfQuizzes: {
//         type: Number
//         // required: true
//     }
// });

// // Quiz schema
// var Quiz = new mongoose.Schema({
//     question: {
//         type: String
//         // required: [true, 'Question is required']
//     },
//     options: [
//         {
//             type: String
//             // required: [true, 'Options are required']
//         }
//     ],
//     answer: {
//         type: String,
//         required: true
//     }
// });

// //Each section has a set of videdos with this schema
// var SectionVideo = new mongoose.Schema({
//     videoUrl: { type: String, required: true },
//     videoContentDetail: { type: String, required: true },
//     readingResources: [{ type: String }]
// });

// //Course is the Array of SectionCourseContent
// var SectionCourseContent = new mongoose.Schema(
//     {
//         sectionDetail: SectionDetails,
//         videoContent: [SectionVideo],
//         sectionReadingMaterials: [{ type: String }],
//         sectionQuiz: [Quiz]
//     },
//     { timestamps: true }
// );

//Schema of each Course
var courseSchema = new mongoose.Schema(
    {
        coursename: {
            type: String
            // required: [true, 'Name is the required field']
        },
        topic: {
            type: String
            // required: [true, 'Topic is the required field']
        },
        tags: [
            {
                type: String
                // required: [true, 'Tags are required']
            }
        ],
        cost: {
            type: Number
            // required: [true, 'Cost is required field']
        },
        checkoutCost: {
            type: Number
            // required: [true, 'Cost is required field']
        },
        about: {
            type: String
            // required: [true, 'About section is required ']
        },
        boughtBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
        // instructor: {},
        // syllabus: [SectionDetails],
        approxTimeToComplete: {
            type: String
            // required: [true, 'Time to complete is required ']
        },
        // rating: {},
        skills: {
            type: [
                {
                    type: String
                    // required: [
                    //     true,
                    //     'The skills that will be learning is required'
                    // ]
                }
            ]
        }
        // courseContent: [SectionCourseContent]
    },
    { timestamps: true }
);

var Course = mongoose.model('course', courseSchema);
module.exports = Course;
