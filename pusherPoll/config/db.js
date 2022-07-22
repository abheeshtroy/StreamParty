const mongoose = require('mongoose');

//Map global promises
mongoose.Promise = global.Promise; 

//Mongoose connect
mongoose.connect('mongodb+srv://abheeshtr11:welcome404@cluster0.f4w6zs5.mongodb.net/vote-database?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));