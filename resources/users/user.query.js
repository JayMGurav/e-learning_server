module.exports = {
    user: async (parent, { username }, { models }) => {
        return await models.User.findOne({ username }).exec();
    },
    users: async (parent, args, { models }) =>
        await models.User.find({}).exec(),
    me: async (parent, args, { models, user }) => {
        return await models.User.findById(user.id).exec();
    }
};
