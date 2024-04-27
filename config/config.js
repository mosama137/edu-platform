// Import and configure dotenv
require('dotenv').config()

// Export an object with the specified properties
const config = {
    port: process.env.PORT,
    dbURI: process.env.DB_URI,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET
};

module.exports = config


