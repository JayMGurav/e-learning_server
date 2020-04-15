var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
    return this.toString();
};
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var { AuthenticationError } = require('apollo-server-express');
var { stripe } = require('../../stripe.js');

require('dotenv').config();

module.exports = {
    //Sign In mutation

    signUp: async (_, { username, email, password }, { models }) => {
        //hash the password before creating user
        let hashedPassword = await bcrypt.hash(password, 10);
        try {
            //check if there already exist a user with the mail
            let finduser = await models.User.findOne({ email });
            if (finduser) {
                throw new AuthenticationError(
                    'Error Signing up the user : User already exist'
                );
            } else {
                let user = await models.User.create({
                    username,
                    email,
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
    buyCourse: async (_, { source, courseId }, { models, user }) => {
        //adds course id to the user document
        // add the transaction details to the transaction details document
        if (!user) {
            throw new Error('User not authenticated');
        }
        try {
            let userData = await models.User.findOne({
                _id: user.id
            });
            if (!userData) {
                throw new Error('User not found');
            }
            let course = await models.Course.findOne({ _id: courseId }).exec();

            //Create the customer with the email and may be stripe id
            const customer = await stripe.customers.create({
                email: userData.email,
                source
            });
            //Charge the customer with the amount of the cost of the course
            const charge = await stripe.charges.create({
                amount: course.checkoutCost,
                description: `charged of the course : ${course.coursename}`,
                currency: 'inr',
                customer: customer.id
            });

            // if charging is successfull update the schemas of both : User and Course and then return updated user
            //Change this line for already bought courses
            if (charge) {
                //upadte bought course in user schema
                let updatedUser = await models.User.findByIdAndUpdate(
                    user.id,
                    {
                        $set: { stripeID: customer.id },
                        $addToSet: {
                            coursesBought: mongoose.Types.ObjectId(courseId)
                        }
                    },
                    { new: true }
                );
                //then update bought by in course schema
                await models.Course.findByIdAndUpdate(
                    courseId,
                    {
                        $addToSet: {
                            boughtBy: mongoose.Types.ObjectId(user.id)
                        }
                    },
                    { new: true }
                );
                //return the updated user
                return updatedUser;
            }
        } catch (err) {
            console.error(err);
        }
    }
};
