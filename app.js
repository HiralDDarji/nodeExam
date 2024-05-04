const express = require('express');

const app = express();

const path = require('path');

const multer = require('multer');

const bodyParser = require('body-parser');

const db = require('./util/database');

// Router Inclusion
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');

// General module inclusion
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Model Inclusion
const User = require('./models/user');
const Products = require('./models/products');

// File Storage Code
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/');
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));


User.hasMany(Products);

app.use(authRouter);
app.use(productRouter);

db
.sync()
// .sync({force: true})
// .sync({alter: true})
.then(() => {
    app.listen(8080);
})
.catch((err) => {
    console.log(err, 'error in sync');
})
