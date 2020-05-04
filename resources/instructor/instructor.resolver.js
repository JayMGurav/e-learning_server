var mongoose = require('mongoose');
module.exports = {
    courses: async (instructor, args, { models, user }) => {
        if (!user.id) {
            return new Error('Not Signed in | instructor not found');
        }
        return await models.Course.find({
            instructor: mongoose.Types.ObjectId(instructor._id)
        })
            .sort({ _id: -1 })
            .exec();
    }
};
