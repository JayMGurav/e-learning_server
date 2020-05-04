var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
    return this.toString();
};
module.exports = {
    courses: async (_, {}, { models }) => await models.Course.find({}).exec(),
    courseById: async (_, { id }, { models }) => {
        try {
            let { _doc } = await models.Course.findById(id).exec();

            if (_doc) {
                return {
                    ..._doc
                    // cost: (_doc.cost / 100).toString(),
                    // checkoutCost: (_doc.checkoutCost / 100).toString()
                };
            } else {
                throw new Error('Error : Course not found');
            }
        } catch (err) {
            console.error('Error finding course', course);
        }
    },
    courseByName: async (_, { courseName }, { models }) => {
        try {
            let course = await models.Course.findOne({
                coursename: courseName.toString()
            }).exec();
            if (course) {
                return course;
            } else {
                return new Error('Course not found');
            }
        } catch (err) {
            console.error('Error finding course', course);
        }
    },
    isCourseBought: async (_, { id }, { models, user }) => {
        if (user) {
            // models.User.getPlanCache().clear();
            // models.Course.getPlanCache().clear();
            let { _doc } = await models.Course.findById(id).exec();
            let userData = await models.User.findById(user.id);
            if (
                _doc.boughtBy.includes(user.id) &&
                userData.coursesBought.includes(mongoose.Types.ObjectId(id))
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return new Error('User,Not signed in');
        }
    },
    getCourseSection: async (
        _,
        { courseId, topicId, contentId },
        { models, user }
    ) => {
        if (user) {
            let data = await models.Course.aggregate([
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(courseId),
                        courseContent: {
                            $elemMatch: {
                                _id: mongoose.Types.ObjectId(topicId)
                            }
                        }
                    }
                },
                {
                    $unwind: '$courseContent'
                },
                {
                    $unwind: '$courseContent.content'
                },
                {
                    $match: {
                        'courseContent.content._id': mongoose.Types.ObjectId(
                            contentId
                        )
                    }
                },
                {
                    $unset: [
                        'cost',
                        'boughtBy',
                        'tags',
                        'image',
                        'skills',
                        'about',
                        'checkoutCost',
                        'finalQuiz'
                    ]
                }
            ]);

            const datatoReturn = {
                ...data[0],
                courseContent: [
                    {
                        ...data[0].courseContent,
                        content: [
                            {
                                ...data[0].courseContent.content
                            }
                        ]
                    }
                ]
            };
            if (data && datatoReturn) {
                return datatoReturn;
            } else {
                return new Error('Not Found');
            }
        } else {
            return new Error('User,Not signed in');
        }
    }
};
