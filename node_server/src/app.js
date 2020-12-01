"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const currency_router_1 = require("./routes/api/currency.router");
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/currency', currency_router_1.currencyRouter);
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("Server started on port:", PORT));
