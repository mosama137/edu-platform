const express = require('express')
const createError = require('http-errors')

// configurations and DB
const config = require('./config/config')
const mongoose = require('mongoose')
// --------------------------------------------------

// import middlewares
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
// --------------------------------------------------

// import routes
const routes = require('./routes')
// --------------------------------------------------



class MyApp {
    constructor() {
        this.app = express()
        this.setupMiddlewares()
        this.setupRoutes()
        this.startServer()
        this.connectToMongoDB() // Call the MongoDB connection method
    }
    // setup middlewares
    setupMiddlewares() {
        // Add middleware here
        this.app.use(cors())
        this.app.use(cookieParser())
        this.app.use(morgan('dev'))
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(helmet())


    }
    // setup routes
    setupRoutes() {
        // Add routes here
        this.app.use('/api/v1', routes)

        // not found routes
        this.app.use((req, res, next) => {
            next(createError.NotFound('This Page not Found'))
        })
        // handle errors
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500)
            res.send({
                error: {
                    status: err.status || 500,
                    msg: err.message,
                }
            })
        })
    }

    connectToMongoDB() {
        const dbURI = config.dbURI;
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB:', err);
            });
    }
    // start server
    startServer() {
        const PORT = process.env.PORT || 3000;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

module.exports = MyApp


