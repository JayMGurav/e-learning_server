// var mongoose = require('mongoose');
// const { ObjectId } = mongoose.Types;
// ObjectId.prototype.valueOf = () => this.toString();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var { AuthenticationError } = require('apollo-server-express');

require('dotenv').config();
module.exports = {
    instructorSignUp: async (_, { username, email, password }, { models }) => {
        let hashedPassword = await bcrypt.hash(password, 10);
        try {
            let findInstructor = await models.Instructor.findOne({ email });
            if (findInstructor) {
                throw new AuthenticationError(
                    'Error signing up to the user: user already exists'
                );
            } else {
                let instructor = await models.Instructor.create({
                    username,
                    email,
                    password: hashedPassword
                });

                if (instructor) return true;
                else {
                    return false;
                }
            }
        } catch (err) {
            console.error('Error signing up user:', err);
        }
    },
    instructorSignIn: async (_, { email, password }, { models }) => {
        let instructor = await models.Instructor.findOne({ email }).exec();
        if (!instructor) {
            throw new AuthenticationError(
                'Error signing in : Not a registered user'
            );
        }

        let passwordCheck = bcrypt.compare(password, instructor.password);
        if (!passwordCheck) {
            return new AuthenticationError(
                'Error signin in: Incorrect password'
            );
        }

        let token = jwt.sign({ id: instructor._id }, process.env.JWT_SECRET);

        return token;
    }
};
