import * as mongodb from "mongodb";

export interface Meal {
    name: string;
    type: "meatless" | "chicken" | "turkey" | "other";
    rating: number;
    _id?: mongodb.ObjectId;
}