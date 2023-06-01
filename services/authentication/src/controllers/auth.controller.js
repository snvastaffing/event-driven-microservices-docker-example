const logger = require('winston');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Auth = require('../models/auth.model');
const config = require('../environment/config');
const Mongoose = require('mongoose');

const authController = {
  authenticate: async (ctx) => {
    try {
      console.log("Before CAlling the api"+JSON.stringify(ctx.request.body))      
      
      
      console.log("The Database ",Mongoose.connection.db.databaseName);
      // console.log(Mongoose.connection.db.collection.name);

      
      const user = await Auth.findOne({ emailAddress: ctx.request.body.emailAddress });
      console.log("The User"+user)
      if (!user) ctx.throw(404);
      if (!(bcrypt.compareSync(ctx.request.body.password, user.password))) {
        ctx.body = { auth: false, token: null };
      } else {
        const token = jwt.sign({ id: user.emailAddress, role: user.role }, config.jwtsecret, {
          expiresIn: 86400, // expires in 24 hours
        });
        ctx.body = { auth: true, token };
      }
    } catch (err) {
      console.log("The User"+err)
      ctx.throw(500);
    }
  },

  add: async (message) => {
    let user;
    try {
      user = JSON.parse(message.content.toString());
      const hashedPassword = bcrypt.hashSync(user.password, 8);
      await Auth.create({
        role: user.role,
        emailAddress: user.emailAddress,
        password: hashedPassword,
      });
      logger.info(`user auth record created - ${user.emailAddress}`);
    } catch (err) {
      logger.error(`Error creating auth record for user ${user.emailAddress} : ${err}`);
    }
  },
};

module.exports = authController;
