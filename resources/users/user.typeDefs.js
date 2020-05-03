var { gql } = require('apollo-server-express');

var userTypeDefs = gql`
    scalar Date
    scalar DateTime

    enum Gender {
        MALE
        FEMALE
        OTHERS
    }
    type Score {
        _id: ID
        courseId: ID
        marks: Int
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        name: String!
        tel: String!
        avatar: String
        dateOfBirth: Date
        gender: Gender
        stripeID: String
        wishList: [Course!]
        cart: [Course!]
        coursesBought: [Course!]
        score: [Score]
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    input UserUpdateInputType {
        username: String
        email: String
        name: String
        avatar: String
        dateOfBirth: Date
        gender: Gender
    }

    type Query {
        user(username: String, email: String): User!
        users: [User!]
        me: User!
        getScore(courseId: ID): User
        cart: [Course!]
    }
    type Mutation {
        signUp(
            username: String!
            tel: String!
            email: String!
            password: String!
        ): Boolean!
        signIn(email: String!, password: String!): String!
        updateMe(input: UserUpdateInputType!): User!
        resetPassword(email: String!): Boolean!
        buyCourse(
            source: String
            email: String!
            coursename: String
            courseId: ID!
        ): User
        addToCart(coursename: String!): Course
        addCourseScore(courseId: ID): Boolean
        incrementScore(courseId: ID): Boolean
    }
`;

module.exports = userTypeDefs;
