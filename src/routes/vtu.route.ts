import express from 'express'
const router = express.Router()
import Auth from '../middlewares/auth'
import {
    FetchNetworkID,
    BuyAirTime,
    BuyData,
    GetTransactions,
    GetAllTransactions,
    Statistics
} from '../controllers/vtu.controller'
import { GetDataPlans } from '../controllers/vtu.controller';

router.post('/airtime', Auth, BuyAirTime)
router.post('/data', Auth, BuyData)
router.get('/', FetchNetworkID)
router.get('/history', Auth, GetTransactions)
router.get('/stats', Auth, Statistics)
router.get('/data', GetDataPlans)
router.get('/all_transactions', Auth, GetAllTransactions)
router.get('/data-plans', GetDataPlans); // New endpoint for GetDataPlans
export default router
