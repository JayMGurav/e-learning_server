var { mergeTypes } = require('merge-graphql-schemas');
var userTypeDefs = require('./users/user.typeDefs.js');
var courseTypeDefs = require('./courses/course.typeDefs.js');

var typeArr = [userTypeDefs, courseTypeDefs];

module.exports = mergeTypes(typeArr, { all: true });
