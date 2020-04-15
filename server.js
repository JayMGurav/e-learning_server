var express = require('express');
var {
    ApolloServer,
    gql,
    AuthenticationError
} = require('apollo-server-express');
require('dotenv').config();
var jwt = require('jsonwebtoken');
var helmet = require('helmet');
var cors = require('cors');
var depthLimit = require('graphql-depth-limit');
var { createComplexityLimitRule } = require('graphql-validation-complexity');
var dbConnect = require('./db.js');
var typeDefs = require('./resources/index.typeDefs.js');
var resolvers = require('./resources/index.js');
var models = require('./resources/index.models.js');
// var { stripe } = './stripe.js';

// get user from token
function getUser(token) {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new AuthenticationError(
                'Invalid Session(token), please log in'
            );
        }
    }
}

//set DB URL and port to listen
var DB_HOST = process.env.MONGO_URL;
var port = process.env.PORT || 4000;

var app = express(); //create an app
app.use(helmet()); //set helmet as middleware to set the security headers
//overides the default cors set during apollo server
// app.use(cors()); //set cors as middleware

dbConnect.connect(DB_HOST); //connect to database

var gqlServer = new ApolloServer({
    typeDefs: gql`
        ${typeDefs}
    `,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({ req }) => {
        let token = req.headers.authorization;
        let user = getUser(token);
        // add it to the context
        //user might be normal user(student) || an instructor
        return { models, user };
    }
});

gqlServer.applyMiddleware({
    app,
    path: '/api',
    cors: {
        credentials: true,
        origin: 'http://localhost:8080'
    }
});

require('http')
    .createServer(app)
    .listen(port, function() {
        console.log(
            `Graphql running at http://localhost:${port}${gqlServer.graphqlPath}`
        );
    });
