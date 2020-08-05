//connecting the database
const mongoose = require('mongoose');

//default connection
const mongodb = 'mongodb://127.0.0.1/CrudDb'; /* localhost:27018 */
mongoose.connect(mongodb, {useNewUrlParser: true});

//get the default conection
const db = mongoose.connection;
//bind connection to error event 
db.on('error', console.error.bind(console, 'Error in DB connction'));
db.once('open', function(){
    console.log('successfully connected to MongoDB...');
})
module.exports = mongoose;

