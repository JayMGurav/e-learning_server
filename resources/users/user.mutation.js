var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
    return this.toString();
};
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var { AuthenticationError } = require('apollo-server-express');
var { stripe } = require('../../stripe.js');
const { v4: uuid } = require('uuid');

require('dotenv').config();

module.exports = {
    //Sign In mutation

    signUp: async (_, { username, tel, email, password }, { models }) => {
        //hash the password before creating user
        let hashedPassword = await bcrypt.hash(password, 10);
        try {
            //check if there already exist a user with the mail
            let finduser = await models.User.findOne({ email });
            if (finduser) {
                return new AuthenticationError(
                    'Error Signing up the user : User already exist'
                );
            } else {
                let user = await models.User.create({
                    username,
                    email,
                    tel: tel.toString(),
                    password: hashedPassword
                });

                if (user) return true;
                return false;
            }
        } catch (err) {
            console.error('Error signing up user : ', err);
        }
    },

    //Sign In mutation
    signIn: async (_, { email, password }, { models, res }) => {
        //trim the spaces and convert email to lowercase before finding
        email = email.trim().toLowerCase();

        let user = await models.User.findOne({ email }).exec();
        if (!user) {
            throw new AuthenticationError(
                'Error signing in : Not a registered user'
            );
        }
        //compare the user entered password with the saved password from the DB
        let validPassword = bcrypt.compare(password, user.password);
        //if not valid throw auth error with wrong password
        if (!validPassword) {
            throw new AuthenticationError('Error Signing in : Wrong password');
        }
        //if a valid user return token;

        //set token as cookie to expire for a 10 days
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return token;
    },
    updateMe: async (_, { input }, { models, user }) => {
        if (user) {
            try {
                let validUser = await models.User.findOne({
                    _id: user.id
                }).exec();
                if (validUser) {
                    let updatedData = await models.User.findByIdAndUpdate(
                        user.id,
                        {
                            $set: input
                        },
                        { new: true }
                    );
                    return updatedData;
                } else {
                    throw new AuthenticationError(
                        'Error updating user data: Not a valid user'
                    );
                }
            } catch (err) {
                console.error('Error during updation : ', err);
            }
        } else {
            throw new AuthenticationError(
                'Error updating user data: Not signed in'
            );
            // return false;
        }
    },

    // resetPassword
    resetPassword: async (_, { email }, { model }) => {},

    buyCourse: async (_, { source, email, courseId }, { models, user }) => {
        //adds course id to the user document
        // add the transaction details to the transaction details document
        if (!user) {
            throw new Error('User not authenticated');
        }
        try {
            // models.User.getPlanCache().clear();
            // models.Course.getPlanCache().clear();
            let userData = await models.User.findById(user.id);
            if (!userData) {
                throw new Error('User not found');
            }
            let course = await models.Course.findById(courseId).exec();
            if (!course) {
                throw new Error('Course not found');
            }
            if (
                userData.coursesBought.includes(
                    mongoose.Types.ObjectId(courseId)
                ) &&
                course.boughtBy.includes(mongoose.Types.ObjectId(user.id))
            ) {
                return userData;
            }

            if (!source && course.checkoutCost === 0) {
                let updatedUser = await models.User.findByIdAndUpdate(
                    user.id,
                    {
                        $addToSet: {
                            coursesBought: mongoose.Types.ObjectId(courseId)
                        }
                    },
                    { new: true, safe: true }
                );
                //then update bought by in course schema
                let updatedCourse = await models.Course.findByIdAndUpdate(
                    courseId,
                    {
                        $addToSet: {
                            boughtBy: mongoose.Types.ObjectId(user.id)
                        }
                    },
                    { new: true, safe: true }
                );
                if (updatedUser && updatedCourse) {
                    return updatedUser;
                }
            }
            const idempotencyKey = uuid();
            //Create the customer with the email and may be stripe id
            if (!userData.stripeID) {
                var customer = await stripe.customers.create({
                    email: email,
                    name: userData.username,
                    phone: userData.tel,
                    source: source
                });
            }
            //Charge the customer with the amount of the cost of the course
            const charge = await stripe.charges.create(
                {
                    amount: course.checkoutCost * 100,
                    description: `Charged of the course : ${course.coursename}`,
                    currency: 'inr',
                    customer: userData.stripeID || customer.id,
                    receipt_email: email,
                    statement_descriptor_suffix: `Charged of the course`
                },
                { idempotencyKey }
            );
            // console.log(charge);
            // if charging is successfull update the schemas of both : User and Course and then return updated user
            //Change this line for already bought courses
            if (charge) {
                //upadate bought course in user schema
                let updatedUser = await models.User.findByIdAndUpdate(
                    user.id,
                    {
                        $set: { stripeID: userData.stripeID || customer.id },
                        $addToSet: {
                            coursesBought: mongoose.Types.ObjectId(courseId)
                        }
                    },
                    { new: true, safe: true }
                );
                //then update bought by in course schema
                let updatedCourse = await models.Course.findByIdAndUpdate(
                    courseId,
                    {
                        $addToSet: {
                            boughtBy: mongoose.Types.ObjectId(user.id)
                        }
                    },
                    { new: true, safe: true }
                );
                //return the updated user
                if (updatedUser && updatedCourse) {
                    return updatedUser;
                } else {
                    throw new Error('Not Successful');
                }
            }
        } catch (err) {
            console.error(err);
        }
    },
    addCourseScore: async (_, { courseId }, { models, user }) => {
        if (!user) {
            throw new Error('User not authenticated');
        }
        try {
            // models.User.getPlanCache().clear();
            // models.Course.getPlanCache().clear();
            let getUser = await models.User.findById(user.id).exec();
            if (!getUser) {
                throw new AuthenticationError('Unable to find user');
            }
            // console.log(user.id);
            let cId = mongoose.Types.ObjectId(courseId);

            let findCourseScore = await models.User.find({
                _id: user.id,
                score: { $elemMatch: { courseId: cId } }
            });
            if (findCourseScore.length === 0) {
                await models.User.updateOne(
                    {
                        _id: user.id
                    },
                    {
                        $addToSet: {
                            score: {
                                courseId: cId
                            }
                        }
                    },
                    { new: true, safe: true }
                );
                return true;
            }
        } catch (err) {
            console.error(err);
        }
    },
    incrementScore: async (_, { courseId }, { models, user }) => {
        if (!user) {
            throw new Error('User not authenticated');
        }
        try {
            // models.User.getPlanCache().clear();
            // models.Course.getPlanCache().clear();
            let getUser = await models.User.findById(user.id).exec();
            if (!getUser) {
                throw new AuthenticationError('Unable to find user');
            }
            // console.log(user.id);
            let cId = mongoose.Types.ObjectId(courseId);

            let findCourseScore = await models.User.find({
                _id: user.id,
                score: { $elemMatch: { courseId: cId } }
            });
            if (findCourseScore.length === 0) {
                await models.User.updateOne(
                    {
                        _id: user.id
                    },
                    {
                        $addToSet: {
                            score: {
                                courseId: cId
                            }
                        }
                    },
                    { new: true, safe: true }
                );
                return true;
            } else {
                let updateDoc = await models.User.updateOne(
                    {
                        _id: user.id,
                        score: { $elemMatch: { courseId: cId } }
                    },
                    {
                        $inc: {
                            'score.$.marks': 1
                        }
                    },
                    { upsert: true, new: true, safe: true }
                );
                if (!updateDoc) {
                    throw new Error('Score Not updated');
                }
                return true;
            }
        } catch (err) {
            console.error(err);
        }
    }
};
