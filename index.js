const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ItemRouter = require('./item/router');
const errorHandler = require('./error-handler');
const ShopRouter = require('./shop/router');
const InventoryRouter = require('./inventory/router');
const swaggerSpec = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const logger = require("./logger");
const morgan = require("morgan");

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
    origins: [process.env.CLIENT_URL]
}));

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

app.use("/api/v1/item", ItemRouter);
app.use("/api/v1/shop", ShopRouter);
app.use("/api/v1/inventory", InventoryRouter);


app.use(errorHandler);

const start = () => {
    const port = process.env.PORT || 5000;
    try {
        app.listen(port, () => {
            logger.info(`Server started on port: ${port}`);
        });
    } catch (e) {
        logger.error(`Error starting the server: ${e.message}`);
    }
};

start();
