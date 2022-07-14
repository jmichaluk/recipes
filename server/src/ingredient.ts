import * as mongodb from "mongodb";

export interface Ingredient {
    name: string;
    _id?: mongodb.ObjectId;
}