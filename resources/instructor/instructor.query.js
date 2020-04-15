var { AuthenticationError } = require('');
module.exports = {
    intructor: async (_, { username, id }, { models }) => {
        let instructor = await models.Instructor.findOne({
            $or: [{ id }, { username }]
        }).exec();
        if (!instructor) {
            throw new Error(
                'Error Getting profile : Could not find the instructor '
            );
        }
    },
    me: async (_, __, { models, user }) => {
        if (!user) {
            throw new AuthenticationError(
                'Error getting profile : Not a registered user'
            );
        }
        if (user) {
            let instructor = await models.Instructor.findById({
                id: user.id
            }).exec();
            if (instructor._id == user.id) {
                return instructor;
            } else {
                throw new AuthenticationError(
                    'Error getting profile : Not a valid user '
                );
            }
        }
    }
};
