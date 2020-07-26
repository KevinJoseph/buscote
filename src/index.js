
/*if(process.env.NODE_ENV === 'development'){
import dotenv from 'dotenv';
dotenv.config();
}*/
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

const app = express();

//Connect to Database
const mongoose = require('mongoose');
const uri = 'mongodb+srv://vekjs:p131471483@cluster0-yzzb4.mongodb.net/test?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology:true};

mongoose.connect(uri, options)
    .then(
        () => {console.log('Connect Database')},
        err => {console.log(err)}
    );

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));
app.use('/request', require('./routes/request'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, '../','public')));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('Server listeng port '+ app.get('port'));
});
