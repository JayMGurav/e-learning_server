module.exports = {
    // igh
    addCourse: async (_, { input }, { models }) => {
        try {
            let cost = 0;
            let checkOutCost = 0;
            // convert Rs to paisa format
            if (
                Number.isInteger(input.cost) &&
                Number.isInteger(input.checkoutCost)
            ) {
                cost = input.cost * 100;
                checkOutCost = input.checkoutCost * 100;
            }

            let { _doc } = await models.Course.create({
                ...input,
                cost: cost,
                checkoutCost: checkOutCost
            });
            return {
                ..._doc,
                cost: _doc.cost / 100,
                checkoutCost: _doc.checkoutCost / 100
            };
        } catch (err) {
            console.error('Error occured while adding course : ', err);
        }
    }

    // addCourseSyllabus: async (_, { input }, { models }) => {
    //     try {
    //         // console.log(input);
    //         let course = await models.Course.findOne({
    //             $or: [{ id: input.id }, { coursename: input.coursename }]
    //         }).exec();
    //         if (course) {
    //             //update the course document to add the course syllabus
    //             console.log('Found Course :  ', course);
    //             return course;
    //         } else {
    //             let err = new Error('Course not found ');
    //             console.error('Error adding course syllabus : ', err);
    //         }

    //         console.log({ ..._doc, cost: _doc.cost.toString() });
    //         return { ..._doc, cost: _doc.cost.toString() };
    //     } catch (err) {
    //         console.error('Error occured while adding course : ', err);
    //     }
    // }
};
