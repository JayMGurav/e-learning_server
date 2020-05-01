var { mergeTypes } = require('merge-graphql-schemas');
var userTypeDefs = require('./users/user.typeDefs.js');
var courseTypeDefs = require('./courses/course.typeDefs.js');
var instructorTypeDefs = require('./instructor/instructor.typeDefs.js');

var typeArr = [userTypeDefs, courseTypeDefs, instructorTypeDefs];

module.exports = mergeTypes(typeArr, { all: true });
