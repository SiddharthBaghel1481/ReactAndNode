const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.paths = {
            auth: '/api/auth/',
            connect:'/api/connect/'
        }
        this.middlewares()
        this.routes();
        this.connectToDatabase();

    }
    async connectToDatabase() {
        try {
            const dbconncet = process.env.mongo_URL;
            if (!dbconncet) {
                throw new Error('MongoDB URL is not defined in environment variables');
            }
            await mongoose.connect(dbconncet);
            console.log('MongoDB connected');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        }
    }


    middlewares() {
        this.app.use(cors());
        this.app.use(helmet())
        this.app.use(bodyParser.json({ limit: '50mb' }))
        this.app.use(morgan('dev'))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use('/Images', express.static(path.join(__dirname, 'build/Images')));

        // this.app.use(express.static(path.join(__dirname, "../client/build")))
       }
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.connect, require('../routes/connect'))
        this.app.get('*', (req, res) => {
            res.status(404).send('404 not found ')
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('http://localhost:' + this.port)
        })
    }
}


module.exports = Server