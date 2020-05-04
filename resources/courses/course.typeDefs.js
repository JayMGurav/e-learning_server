var { gql } = require('apollo-server-express');

var courseTypeDefs = gql`
    type SectionContent {
        _id: ID
        topicName: String!
        videoUrl: String!
        videoContentDetail: String
        sectionQuiz: Quiz
    }

    type Quiz {
        _id: ID
        question: String
        options: [String!]
        answer: String
    }

    type CourseSectionContent {
        _id: ID
        title: String!
        content: [SectionContent!]
    }

    type Course {
        _id: ID
        coursename: String!
        image: String!
        topic: String!
        tags: [String!]
        level: String!
        cost: Int!
        checkoutCost: Int!
        about: String
        instructor: Instructor!
        boughtBy: [User!]
        approxTimeToComplete: String!
        skills: [String!]
        courseContent: [CourseSectionContent!]
        finalQuiz: [Quiz!]
        createdAt: DateTime
        updatedAt: DateTime
    }

    input InstructorInput {
        id: ID!
    }

    input CourseDetailsInput {
        coursename: String!
        topic: String!
        tags: [String!]!
        level: String!
        cost: Int!
        checkoutCost: Int!
        about: String!
        approxTimeToComplete: String!
        skills: [String!]!
        image: String!
    }

    input SectionContentInput {
        topicName: String!
        videoUrl: String!
        videoContentDetail: String
        sectionQuiz: QuizInput
    }

    input QuizInput {
        question: String
        options: [String!]
        answer: String
    }

    input CourseSectionContentInput {
        _id: ID
        title: String!
        content: [SectionContentInput!]
    }

    input AddFinalQuizInput {
        courseId: ID
        quiz: [QuizInput!]
    }

    extend type Mutation {
        addCourseDetail(input: CourseDetailsInput): ID!
        addCourseSectionContent(input: CourseSectionContentInput): Boolean!
        addFinalQuiz(input: AddFinalQuizInput!): Boolean!
    }
    extend type Query {
        courses: [Course!]
        courseById(id: ID): Course
        courseByName(courseName: String!): Course
        getCourseSection(courseId: ID, topicId: ID, contentId: ID): Course
        isCourseBought(id: ID): Boolean
    }
`;
// SectionContent;

module.exports = courseTypeDefs;
