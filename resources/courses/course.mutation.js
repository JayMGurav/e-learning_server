var mongoose = require('mongoose');
// const { ObjectId } = mongoose.Types;
// ObjectId.prototype.valueOf = function() {
//     return this.toString();
// };

module.exports = {
    // igh
    addCourseDetail: async (_, { input }, { models, user }) => {
        try {
            // let cost = 0;
            // let checkOutCost = 0;
            // // convert Rs to paisa format
            // if (
            //     Number.isInteger(input.cost) &&
            //     Number.isInteger(input.checkoutCost)
            // ) {
            //     cost = input.cost * 100;
            //     checkOutCost = input.checkoutCost * 100;
            // }
            let getInstructor = await models.Instructor.findById(
                user.id
            ).exec();
            if (!getInstructor) {
                return new Error(
                    'Instructor Not found Not allowed to add this Quiz'
                );
            }
            let courseDetail = await models.Course.create({
                ...input,
                instructor: mongoose.Types.ObjectId(getInstructor._id),
                courseContent: []
            });
            if (courseDetail && getInstructor) {
                let updatedInstructor = await models.Instructor.findByIdAndUpdate(
                    user.id,
                    {
                        $addToSet: {
                            courses: mongoose.Types.ObjectId(courseDetail._id)
                        }
                    },
                    { new: true }
                );
                if (updatedInstructor) {
                    return courseDetail._id;
                } else {
                    throw new Error('Could not add this course to instructor');
                }
            } else {
                throw new Error('Error during Creating course');
            }
        } catch (err) {
            console.error('Error occured while adding course : ', err);
        }
    },

    addCourseSectionContent: async (_, { input }, { models, user }) => {
        try {
            let getInstructor = await models.Instructor.findById(
                user.id
            ).exec();
            if (!getInstructor) {
                return new Error(
                    'Instructor Not found Not allowed to add this Quiz'
                );
            }
            let course = await models.Course.findById(input._id).exec();
            if (course) {
                //update the course document to add the course syllabus
                let dataToUpdate = {
                    title: input.title,
                    content: input.content,
                    sectionQuiz: input.sectionQuiz
                };
                let updatedCourse = await models.Course.findByIdAndUpdate(
                    input._id,
                    {
                        $addToSet: {
                            courseContent: dataToUpdate
                        }
                    },
                    { new: true }
                );
                if (updatedCourse) {
                    return true;
                } else {
                    return false;
                }
            } else {
                let err = new Error('Course not found ');
                console.error('Error adding course syllabus : ', err);
                return false;
            }
        } catch (err) {
            console.error('Error occured while adding course Section : ', err);
        }
    },
    addFinalQuiz: async (_, { input }, { models, user }) => {
        try {
            let getInstructor = await models.Instructor.findById(
                user.id
            ).exec();
            if (!getInstructor) {
                return new Error(
                    'Instructor Not found Not allowed to add this Quiz'
                );
            }
            let course = await models.Course.findById(input.courseId).exec();
            if (!course) {
                return new Error('Course Not found Not able to add this Quiz');
            }
            let updatedCourse = await models.Course.findByIdAndUpdate(
                input.courseId,
                {
                    $set: {
                        finalQuiz: input.quiz
                    }
                },
                { new: true }
            );
            if (!updatedCourse) {
                return new Error('Failed to add quiz to course!!');
            }
            return true;
        } catch {
            return new Error('Error adding final Quiz : ', err);
        }
    }
};
