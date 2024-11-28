const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ItemRouter = require('./Remains/item/router');
const errorHandler = require('./error-handler');
const ShopRouter = require('./Remains/shop/router');

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origins: ['*', "http://localhost:3000"]
}));
app.use(express.json());
app.use("/api/v1/item", ItemRouter);
app.use("/api/v1/shop", ShopRouter);
app.use(errorHandler);

const start = async () => {
    
    const port = process.env.PORT;
    try {
        await app.listen(port, () => console.log("Started at port: ", port));
    } catch (e) {
        console.log(e.message);        
    }
};

start();
