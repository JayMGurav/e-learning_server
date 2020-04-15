var { gql } = require('apollo-server-express');

// courseContent: [SectionCourseContent]
// scalar Date
// syllabus: [SectionDetails]
// scalar DateTime
var courseTypeDefs = gql`
    type Course {
        _id: ID
        coursename: String
        topic: String
        tags: [String]
        cost: Int
        checkoutCost: Int
        about: String
        boughtBy: [User!]
        approxTimeToComplete: Int
        skills: [String]
        createdAt: DateTime
        updatedAt: DateTime
    }
    input CourseInput {
        coursename: String!
        topic: String!
        tags: [String!]!
        cost: Int!
        checkoutCost: Int!
        about: String!
        approxTimeToComplete: String!
        skills: [String!]!
    }

    extend type Mutation {
        addCourse(input: CourseInput): Course
    }
    extend type Query {
        courses: [Course!]
        course(coursename: String, id: ID): Course
    }
`;

module.exports = courseTypeDefs;

// type Courses {
//     coursename: String!
//     topic: String!
//     tags: [String!]!
//     cost: Int!
//     checkoutCost: Int!
//     about: String!
//     approxTimeToComplete: Int!
//     skills: [String!]!

// addCourseSyllabus(
//     id: ID!
//     coursename: String
//     syllabus: [CourseSyllabusInput!]
// ): Course

// type SectionDetails {
//     timeToComplete: Int!
//     title: String!
//     detail: String!
//     numberOfVideos: Int!
//     numberOfReadings: Int!
//     numberOfQuizzes: Int!
// }

// type Quiz {
//     question: String!
//     options: [String!]!
//     answer: String!
// }

// type SectionVideo {
//     videoUrl: String!
//     videoContentDetail: String!
//     readingResources: [String!]!
// }

// type SectionCourseContent {
//     sectionDetail: SectionDetails!
//     videoContent: [SectionVideo!]!
//     sectionReadingMaterials: [String!]!
//     sectionQuiz: [Quiz!]!
//     createdAt: DateTime
//     updatedAt: DateTime
// }

// input CourseSyllabusInput {
//     timeToComplete: Int!
//     title: String!
//     detail: String!
//     numberOfVideos: Int!
//     numberOfReadings: Int!
//     numberOfQuizzes: Int!
// }
// input QuizInput {
//     question: String!
//     options: [String!]!
//     answer: String!
// }

// input SectionDetailsInput {
//     timeToComplete: Int!
//     title: String!
//     detail: String!
//     numberOfVideos: Int!
//     numberOfReadings: Int!
//     numberOfQuizzes: Int!
// }
// input SectionVideoInput {
//     videoUrl: String!
//     videoContentDetail: String!
//     readingResources: [String!]!
// }

// input SectionCourseContentInput {
//     sectionDetail: SectionDetailsInput!
//     videoContent: [SectionVideoInput!]!
//     sectionReadingMaterials: [String!]!
//     sectionQuiz: [QuizInput!]!
// }
