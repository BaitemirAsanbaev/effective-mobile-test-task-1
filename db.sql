CREATE TABLE Item ("plu" UUID PRIMARY KEY, "name" VARCHAR(50));

CREATE TABLE Shop ("id" SERIAL PRIMARY KEY, "name" VARCHAR(50));

CREATE TABLE
    Inventory (
        "item_plu" UUID,
        "shop_id" INT,
        "ordered_amount" INT,
        "available_amount" INT,
        FOREIGN KEY ("item_plu") REFERENCES Item (plu),
        FOREIGN KEY ("shop_id") REFERENCES Shop (id)
    );