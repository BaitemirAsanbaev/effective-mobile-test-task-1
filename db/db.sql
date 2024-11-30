CREATE TABLE Item ("plu" UUID PRIMARY KEY, "name" VARCHAR(50) UNIQUE);

CREATE TABLE Shop ("id" SERIAL PRIMARY KEY, "name" VARCHAR(50) UNIQUE);

CREATE TABLE
    Inventory (
        "id" UUID PRIMARY KEY,
        "item_plu" UUID NOT NULL REFERENCES Item (plu),
        "shop_id" INT NOT NULL REFERENCES Shop (id),
        "ordered_amount" INT,
        "available_amount" INT
    );  