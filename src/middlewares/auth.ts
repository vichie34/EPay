import {CONFIG} from '../config/index'
const config = CONFIG()
import jwt from 'jsonwebtoken'
// console.log('Auth middleware triggered');

function auth (req:any, res:any, next:any){
    const token = req.header('Authorization')

    if(!token) return res.status(403).send('Access denied')
    try{
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}` )
        req.user = decoded
        next()
    }catch(error){
        res.status(403).send('Invalid token supplied')
    }
}
export default auth