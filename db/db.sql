CREATE TABLE Item ("plu" UUID PRIMARY KEY, "name" VARCHAR(50) UNIQUE);

CREATE TABLE Shop ("id" SERIAL PRIMARY KEY, "name" VARCHAR(50) UNIQUE);

CREATE TABLE
    Inventory (
        "item_plu" UUID NOT NULL,
        "shop_id" INT NOT NULL,
        "ordered_amount" INT,
        "available_amount" INT,
        FOREIGN KEY ("item_plu") REFERENCES Item (plu),
        FOREIGN KEY ("shop_id") REFERENCES Shop (id)
    );