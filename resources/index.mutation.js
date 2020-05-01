var userMutation = require('./users/user.mutation.js');
var courseMutation = require('./courses/course.mutation.js');
var instructorMutation = require('./instructor/instructor.mutation.js');

module.exports = {
    ...userMutation,
    ...courseMutation,
    ...instructorMutation
};
