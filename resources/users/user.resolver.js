module.exports = {
    coursesBought: async (user, args, { models }) =>
        await models.Course.find({
            boughtBy: user._id
        })
            .sort({ _id: -1 })
            .exec()
};
