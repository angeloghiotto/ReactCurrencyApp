import express from 'express'
import { currencyRouter } from "./routes/api/currency.router";
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/currency', currencyRouter)

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log("Server started on port:", PORT))