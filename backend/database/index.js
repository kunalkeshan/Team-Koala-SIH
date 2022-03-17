/**
 * Database Connection
 */

// Dependencies
const mongoose = require('mongoose');
const { dbUrl } = require('../config');

// Connect to DB
const connectToDb = async () => {
    try {
        await mongoose.connect(dbUrl,);
        console.log('Connected to DB')
    } catch (error) {
        console.log(`Error connecting to DB: ${error}`)
    }
}

connectToDb();