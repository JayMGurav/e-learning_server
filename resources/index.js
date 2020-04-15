var Query = require('./index.query.js');
var Mutation = require('./index.mutation.js');
var Resolvers = require('./index.resolvers.js');
var { GraphQLDateTime, GraphQLDate } = require('graphql-iso-date');

module.exports = {
    Query,
    Mutation,
    ...Resolvers,
    Date: GraphQLDate,
    DateTime: GraphQLDateTime
};
