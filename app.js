
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logger from 'morgan';
import mainRouters from './server/routers/main.js';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));


mongoose.connect('mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&3t.uriVersion=3&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log('Database connected');
    })
    .catch((error)=> {
        console.log('Error connecting to database');
    });


const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Project with Nodejs Express and MongoDB',
    });
});
app.listen(port, () => {
    console.log(`Our server is running on port ${port}`);
});

app.use('/api/',mainRouters);