"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyRouter = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
exports.currencyRouter = express_1.default.Router();
let record = [];
exports.currencyRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default.get('https://openexchangerates.org/api/currencies.json').then((response) => {
        res.status(200).json(response.data);
    }).catch(error => { throw error; });
}));
exports.currencyRouter.get("/historic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.readFile('records.txt', 'utf8', (err, data) => {
        if (err)
            throw err;
        record = JSON.parse(data);
        res.status(200).json(record);
    });
}));
exports.currencyRouter.get("/:value/:inputCurrency/:outputCurrency/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let value = parseInt(req.params.value);
    let inputCurrency = req.params.inputCurrency;
    let outputCurrency = req.params.outputCurrency;
    axios_1.default.get(`https://openexchangerates.org/api/latest.json?app_id=ca69895940d141699f98e1264a496882`).then((response) => {
        let converted = (value / response.data.rates[inputCurrency]) * response.data.rates[outputCurrency];
        res.status(200).json({
            inputCurrency,
            outputCurrency,
            value,
            converted
        });
        fs_1.default.readFile('records.txt', 'utf8', (err, data) => {
            if (err)
                throw err;
            record = JSON.parse(data);
            record.push({
                inputCurrency,
                outputCurrency,
                value,
                converted
            });
            fs_1.default.writeFile('records.txt', JSON.stringify(record), (err) => {
                if (err)
                    throw err;
                console.log('Done');
            });
        });
        console.log(record);
    }).catch(error => { throw error; });
}));
