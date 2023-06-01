const config = {
  name: 'User Management Service',
  baseAPIRoute: 'api',
  port: process.env.PORT || 3000,
  messagebus: process.env.MESSAGE_BUS || 'amqp://rabbitmq',
  environment: process.env.ENVIRONMENT || 'dev',
  db: {
    uri: process.env.DB_URI || 'mongodb+srv://akshaymidha:6K6Rj6661HGaFYtM@cluster0.43frg2e.mongodb.net/auth?retryWrites=true&w=majority',
    // uri: process.env.DB_URI || 'mongodb://localhost:27017/test',

    
    // username: process.env.DB_USERNAME || 'chalumuv-localnewsapplication',
    // password: process.env.DB_PASSWORD || 'TlJ7hnd7iRck25fUFFWYgfJFdK2oSH1N2kbBQjFzb66nqFx486JP6eaCKAQrlyn3Cnwxn6MzJtF5ABeyN9CKYQ==',
  },
  services: {
  },
  messageTimeout: 500,
  jwtsecret: 'yoursecretkey',
};

config.startedMessage = `${config.name} is running on port ${config.port}/`;

module.exports = config;
