const { MONGO_URI, PORT, JWT_SECRET } = process.env;

const config = {
  MONGO_URI,
  PORT,
  JWT_SECRET,
};

module.exports = config;
