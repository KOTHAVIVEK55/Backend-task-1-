const express=require('express');
const app=express();
const port=3000;
const connectionmongo=require('./connection')
const mongoose = require('mongoose');
const routerpath=require('./routes/product');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    next(err);
});

    // Insert a partial product to create the database
  connectionmongo("mongodb://127.0.0.1:27017/management")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed", err));



  
app.use('/products',routerpath);















 app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
 });