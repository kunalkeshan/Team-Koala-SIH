/**
 * Application Configuration
 */

// Dependencies
const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const dbUrl = isProduction ? process.env.MONGODB_URL : 'mongodb://localhost:27017/TeamKoalaSIH'

// Configuration Container
const configuration = {
    PORT: parseInt(process.env.PORT, 10),
    isProduction,
    dbUrl,
    secrets: {
        jwtSecret: process.env.JWT_SECRET,
        cookieSecret: process.env.COOKIE_SECRET,
    }
};

module.exports = configuration;
