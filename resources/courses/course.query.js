module.exports = {
    courses: async (_, {}, { models }) => {
        return await models.Course.find({}).exec();
    },
    course: async (_, { id, coursename }, { models }) => {
        try {
            let { _doc } = await models.Course.findOne({
                $or: [{ _id: id }, { coursename: coursename }]
            }).exec();
            // convert decimal type to String type
            // and then return
            if (_doc) {
                return {
                    ..._doc,
                    cost: _doc.cost.toString(),
                    checkoutCost: _doc.checkoutCost.toString()
                };
            } else {
                console.error('Error : Course not found');
            }
        } catch (err) {
            console.error('Error finding course', course);
        }
    }
};
