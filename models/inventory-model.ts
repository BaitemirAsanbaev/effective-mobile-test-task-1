import { IItem } from "./item-model";
import { IShop } from "./shop-model";

export interface IInventory{
    item:IItem,
    shop:IShop,
    ordered_amount:number,
    available_amount:number
}