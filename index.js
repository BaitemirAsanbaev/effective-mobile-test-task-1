const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ItemRouter = require('./item/router');
const errorHandler = require('./error-handler');
const ShopRouter = require('./shop/router');
const InventoryRouter = require('./inventory/router');
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');
dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origins: [process.env.CLIENT_URL]
}));
app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/item", ItemRouter);
app.use("/api/v1/shop", ShopRouter);
app.use("/api/v1/inventory", InventoryRouter);
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
