var mongoose = require('mongoose');
module.exports = {
    instructor: async (course, args, { models }) => {
        return await models.Instructor.findOne({
            courses: mongoose.Types.ObjectId(course._id)
        })
            .sort({ _id: -1 })
            .exec();
    }
};
