const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors')

const path = require('path');
const fileImage = require('./src/storage/fileImage.js')

// Router
const userRoute = require('./src/routes/user.js');
const loginRoute = require('./src/routes/login.js');
const dashboardRoute = require('./src/routes/dasboard.js');
const refreshToken = require('./src/routes/refreshToken.js');


const app = express();


app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());
app.use(cors())

// Error Message
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.dataDirs
  res.status(status).json({message,data});
});

// Mengatasi image agar dapat diupload atau diakses;
app.use('/image', express.static(path.join(__dirname, 'image')))
app.use(multer({storage:fileImage.fileStorage, filterFile:fileImage.filterFile}).single('image'));



app.use('/', userRoute);
app.use('/', loginRoute);
app.use('/', refreshToken);
app.use('/user', dashboardRoute);

mongoose.connect('mongodb+srv://admin:QvPCU2VnNi9YZXUp@cluster0.fuir5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => app.listen(5000, () => console.log('sukses connect')))
.catch(err => console.log(err));