import express, { Request, response, Response } from "express";
import Axios, { AxiosAdapter } from 'axios'
import fs from 'fs'

export const currencyRouter = express.Router();

interface Record {
    inputCurrency: string,
    outputCurrency: string,
    value: number,
    converted: number
}

let record: Array<Record> = [];

currencyRouter.get("/", async (req: Request, res: Response) => {
    Axios.get('https://openexchangerates.org/api/currencies.json').then((response) => {
        res.status(200).json(response.data)
    }).catch(error => { throw error })
});

currencyRouter.get("/historic", async (req: Request, res: Response) => {
    fs.readFile('records.txt', 'utf8', (err, data) => {
        if (err) throw err;
        record = JSON.parse(data)
        res.status(200).json(record);
    });
})


currencyRouter.get("/:value/:inputCurrency/:outputCurrency/", async (req: Request, res: Response) => {
    let value = parseInt(req.params.value);
    let inputCurrency = req.params.inputCurrency;
    let outputCurrency = req.params.outputCurrency;
    Axios.get(`https://openexchangerates.org/api/latest.json?app_id=ca69895940d141699f98e1264a496882`).then((response) => {
        let converted = (value / response.data.rates[inputCurrency]) * response.data.rates[outputCurrency]
        res.status(200).json({
            inputCurrency,
            outputCurrency,
            value,
            converted
        });

        fs.readFile('records.txt', 'utf8', (err, data) => {
            if (err) throw err;
            record = JSON.parse(data)

            record.push({
                inputCurrency,
                outputCurrency,
                value,
                converted
            });

            fs.writeFile('records.txt', JSON.stringify(record), (err) => {
                if (err) throw err;
                console.log('Done');
            });

        });
    }).catch(error => { throw error })
});