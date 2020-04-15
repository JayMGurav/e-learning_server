var UserResolver = require('./users/user.resolver.js');
var CourseResolver = require('./courses/course.resolver.js');

module.exports = {
    User: UserResolver,
    Course: CourseResolver
};
