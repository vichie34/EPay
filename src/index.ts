import express, { Request, Response } from 'express'
const app = express()
import mongoose from 'mongoose'
import cors from 'cors'
// import {CONFIG}  from './config/index'
import { config } from "dotenv";
import user from './routes/user.route'
import Payment from './routes/payment.route'
import VTU from './routes/vtu.route'
import Review from './routes/review.route'
import Admin from './routes/admin.route'
config();

if(!process.env.JWT_SECRET){
    console.log('No Jwt key provided');
    process.exit(1)  
}
if(!process.env.DATABASE_URL){
    console.log('No database url provided');
    process.exit(1)  
}
const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave('20a4a568eda1c755170af104fb7f7980-X', '7bb9c151b083f031615356a5b77ef720-X');

mongoose.set('debug', true);
console.log('Connecting to:', process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL as string)
    .then(() => console.log('Connection established'))
    .catch((err) => console.error('Failed to establish connection:', err.message));

// home route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Wistop is LIVE🚀🚀",
    });
  })

app.use(cors())
app.use(express.json())
app.use('/api/user', user)
app.use('/api/pay', Payment)
app.use('/api/vtu', VTU )
app.use('/api/review', Review )
app.use('/api/admin', Admin )

app.listen(process.env.PORT, ()=>console.log(`Listening to port ${process.env.PORT}`))
