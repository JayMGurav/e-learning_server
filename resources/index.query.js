var userQuery = require('./users/user.query.js');
var courseQuery = require('./courses/course.query.js');
var instructorQuery = require('./instructor/instructor.query.js');

module.exports = {
    ...userQuery,
    ...courseQuery,
    ...instructorQuery
};
