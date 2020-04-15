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
        gender: Gender!
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

    input InstructorInputType {
        username: String
        email: String
        qualification: String
        profession: String
        bio: String
        avatar: String
        courses: [Courses]
        socialHandles: SocialHandles
    }

    type Query {
        intructor(username: String, id: ID): Instructor!
        me: Instructor!
    }

    type Mutation {
        instructorSignUp(
            username: String!
            email: String!
            password: String!
        ): Boolean!

        instructorSignIn(
            username: String!
            email: String
            password: String!
        ): String!

        instructorUpdateMe(input: InstructorInputType!): Instructor!
    }
`;
