module.exports = {
    courses: async (instructor, args, { models }) =>
        await models.Course.find({
            instructor: instructor._id
        })
            .sort({ _id: -1 })
            .exec()
};
