require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const connect = require('./config/connection')

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

const userRouter=require('./routes/userRoutes')
const vendorRouter = require('./routes/vendorRoutes')
const adminRouter=require('./routes/adminRoutes')


// app.post('/api/register',async(req,res)=>{
//     console.log(req.body);
//     res.json({status:'ok'})
//  })

app.use('/',userRouter);
app.use('/vendor',vendorRouter);
app.use('/admin',adminRouter);

connect();

app.listen(3001,()=>{
    console.log('Server started on 3001');
})