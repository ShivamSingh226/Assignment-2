import express from 'express';
import path from 'path'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
//added comment
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{
console.log('connected to db');
}).catch((err)=>{
  console.log(err.message);
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/seed',seedRouter)
app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)
const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'/supermarket/build')))
app.get('*',(req,res)=>{
  res.send(path.join(__dirname,'/supermarket/build/index.html'))
})
app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message})
})
app.get('/api/keys/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID||'sb')
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
