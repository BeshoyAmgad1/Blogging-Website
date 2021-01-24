const express = require ('express');
const mongoose = require ('mongoose');
const routes = require ('./routes');

const app = express();
mongoose.connect('mongodb://localhost:27017/Blogs',  { useNewUrlParser: true },{ useUnifiedTopology: true } );

app.use(express.json());

app.use('/',routes);


app.use(( req, res, next) => {
    res.status(404).json({ error: 'Not Found'});
})

app.use((err,req,res,next) => {
    if (err instanceof mongoose.Error.ValidationError){
        res.status(422).json(err.errors);
    }
    // dublicate key
    if (err.code === 11000){
        res.status(422).json({StatusCode : 'ValidationError', property : err.KeyValue});
    }
    // Un authenticated
    if (err.message === 'UN_AUTHENTICATED') {
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
      }
    res.status(503).end();
})

const {port=3000} = process.env;
app.listen(port, () => {
    console.log('App is ready on :',port);
})