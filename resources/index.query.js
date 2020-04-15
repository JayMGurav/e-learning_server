var userQuery = require('./users/user.query.js');
var courseQuery = require('./courses/course.query.js');

module.exports = {
    ...userQuery,
    ...courseQuery
};
