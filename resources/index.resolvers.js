var UserResolver = require('./users/user.resolver.js');
var CourseResolver = require('./courses/course.resolver.js');
var InstructorResolver = require('./instructor/instructor.resolver.js');

module.exports = {
    User: UserResolver,
    Course: CourseResolver,
    Instructor: InstructorResolver
};
