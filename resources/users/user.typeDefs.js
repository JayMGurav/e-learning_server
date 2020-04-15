var { gql } = require('apollo-server-express');

var userTypeDefs = gql`
    scalar Date
    scalar DateTime

    enum Gender {
        MALE
        FEMALE
        OTHERS
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        name: String!
        avatar: String
        dateOfBirth: Date
        gender: Gender
        stripeID: String
        wishList: [Course!]
        cart: [Course!]
        coursesBought: [Course!]
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
        user(username: String!): User!
        users: [User!]
        me: User!
        cart: [Course!]
    }
    type Mutation {
        signUp(username: String!, email: String!, password: String!): Boolean!
        signIn(email: String!, password: String!): String!
        updateMe(input: UserUpdateInputType!): User!
        buyCourse(source: String!, coursename: String, courseId: ID): User
        addToCart(coursename: String!): Course
    }
`;

module.exports = userTypeDefs;
