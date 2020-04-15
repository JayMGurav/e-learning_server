var mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        mongoose.connect(DB_HOST, {
            //use mongoose updated url
            useNewUrlParser: true,
            //use findOneAndUpdate instead of findOneAndModify
            useFindAndModify: false,
            //use create index instead of ensureIndex
            useCreateIndex: true,
            //use server discovery and monitory
            useUnifiedTopology: true
        });
        mongoose.connection.on('error', function(err) {
            console.error('Error on DB ', err);
            process.exit();
        });
        mongoose.connection.on('open', function() {
            console.error('Connected to DB 👍');
        });
    },
    close: () => {
        mongoose.connection.close;
    }
};
