module.exports = {
    instructor: async (_, { username, id }, { models }) => {
        let instructor = await models.Instructor.findOne({
            $or: [{ _id: id }, { username }]
        }).exec();
        if (!instructor) {
            return new Error(
                'Error Getting profile : Could not find the instructor '
            );
        } else {
            return instructor;
        }
    },
    instructorMe: async (_, __, { models, user }) => {
        if (!user) {
            return new Error('Error getting profile : Not a registered user');
        }
        let instructor = await models.Instructor.findById(user.id).exec();
        return instructor;
    }
};
