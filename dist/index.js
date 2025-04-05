"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
// import {CONFIG}  from './config/index'
const dotenv_1 = require("dotenv");
const user_route_1 = __importDefault(require("./routes/user.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
const vtu_route_1 = __importDefault(require("./routes/vtu.route"));
const review_route_1 = __importDefault(require("./routes/review.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
(0, dotenv_1.config)();
if (!process.env.JWT_SECRET) {
    console.log('No Jwt key provided');
    process.exit(1);
}
if (!process.env.DATABASE_URL) {
    console.log('No database url provided');
    process.exit(1);
}
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const flw = new flutterwave_node_v3_1.default('your_public_key', 'your_secret_key');
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => console.log('connection established'))
    .catch(() => console.log('Failed to establish connection'));
// home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Wistop is LIVE🚀🚀",
    });
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/user', user_route_1.default);
app.use('/api/pay', payment_route_1.default);
app.use('/api/vtu', vtu_route_1.default);
app.use('/api/review', review_route_1.default);
app.use('/api/admin', admin_route_1.default);
app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));
