const devConfig = {
  MONGO_URL: 'mongodb://localhost/NotificationManagement-dev',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/NotificationManagement-test',
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/NotificationManagement',
};

const defaultConfig = {
  PORT: process.env.PORT || 3005,
};

function envConfig(env) {
  switch (env){
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
