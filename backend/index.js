/**
 * Server Entry
 */

// Dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const appRouter = require('./routers');
const errorHandler = require('./middlewares/error');
const { isProduction, PORT, secrets: { cookieSecret }, reactAppUrl } = require('./config/');

// Initializing Application
require('./database');
const app = express();

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(cookieSecret));
app.use(cors({
    origin: reactAppUrl,
    optionsSuccessStatus: 200,
    credentials: true,
}));
app.use(logger(isProduction ? 'combined' : 'dev'));

// Using App Router
app.use(appRouter);

// Catch Unknown Requests
app.use((req, res, next) => {
    const error = new Error(`${req.originalUrl} does not exist in this server.`);
    error.statusCode = 404;
    next(error);
});

// Error Handling Middleware
app.use(errorHandler);

// Initializing Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})

