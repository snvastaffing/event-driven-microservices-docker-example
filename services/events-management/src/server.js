/* eslint-disable no-console */

// Init the environment variables and server configurations
require('dotenv').config();

// Import the required packages
const Mongoose = require('mongoose');
const config = require('./environment/config');
const app = require('./app');

// Init Database Connection
// Mongoose.connect(config.db.uri, { user: config.db.username, pass: config.db.password });
// Mongoose.connect(config.db.uri,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// // uri: process.env.DB_URI || 'mongodb://localhost:27017/test',
// Mongoose.connection.on('error', console.error);


try{
  console.log("Events Management API Connection String "+ config.db.uri)
  Mongoose.connect(config.db.uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
    ()=>console.log("Could Not Connect Core ")
  );
}
catch(e){
  console.log("Could Not COnnect Manual "+e)
}

Mongoose.connection.on('error', (err)=>console.log("There is an error "+ err));
Mongoose.connection.on('open', ()=>console.log("Connected To DB"));


// Run the API Server
app.listen(config.port, () => {
  console.log(config.startedMessage);
});
