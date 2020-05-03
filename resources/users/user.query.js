module.exports = {
    user: async (parent, { username }, { models }) => {
        return await models.User.findOne({ username }).exec();
    },
    users: async (parent, args, { models }) =>
        await models.User.find({}).exec(),
    me: async (parent, args, { models, user }) => {
        return await models.User.findById(user.id).exec();
    },
    getScore: async (parent, { courseId }, { models, user }) => {
        // console.log(user.id);
        // models.User.getPlanCache().clear();
        return await models.User.findOne(
            {
                _id: user.id,
                score: { $elemMatch: { courseId: courseId } }
            },
            { 'score.$': 1 }
        );
    }
};
