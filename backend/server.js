require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout');
const userRoutes=require('./routes/user')

//express app
const app = express();

//middllware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path , req.method);
    next(); // Appel de next() pour passer au middleware suivant
});

app.use('/api/workouts',workoutRoutes);

app.use('/api/user',userRoutes)

//connect to db 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    //listen for requests
app.listen(process.env.PORT , ()=>{
    console.log("connect to db & listening on port", process.env.PORT )
});
}).catch((error)=>{console.log(error)})

