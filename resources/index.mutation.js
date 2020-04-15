var userMutation = require('./users/user.mutation.js');
var courseMutation = require('./courses/course.mutation.js');

module.exports = {
    ...userMutation,
    ...courseMutation
};
