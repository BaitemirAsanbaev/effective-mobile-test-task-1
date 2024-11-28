const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const inventoryRouter = require('./inventory/router');
const errorHandler = require('./inventory/error-handler');

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origins: ['*', "http://localhost:3000"]
}));
app.use(express.json());
app.use("/api/v1/inventory", inventoryRouter);
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
