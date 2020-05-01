var { gql } = require('apollo-server-express');

var intructorTypeDefs = gql`
    type Instructor {
        _id: ID!
        username: String!
        email: String!
        name: String!
        qualification: String!
        profession: String
        bio: String!
        avatar: String
        courses: [Course!]
        socialHandles: SocialHandles!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type SocialHandles {
        websiteHandle: String
        facebookHandle: String
        linkedinHandle: String
        instagramHandle: String
        twitterHandle: String
    }

    input SocialHandlesInput {
        websiteHandle: String
        facebookHandle: String
        linkedinHandle: String
        instagramHandle: String
        twitterHandle: String
    }

    input InstructorInputType {
        username: String
        email: String
        qualification: String
        profession: String
        bio: String
        avatar: String
        socialHandles: SocialHandlesInput
    }

    extend type Query {
        instructor(username: String, id: ID): Instructor!
        instructorMe: Instructor!
    }

    extend type Mutation {
        instructorSignUp(
            username: String!
            email: String!
            password: String!
        ): Boolean!

        instructorSignIn(email: String!, password: String!): String!

        instructorUpdateMe(input: InstructorInputType!): Instructor!
    }
`;

module.exports = intructorTypeDefs;
