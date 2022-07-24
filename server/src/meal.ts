import * as mongodb from "mongodb";
import { Url, UrlWithStringQuery } from "url";

export interface Meal {
    name: string;
    type: "meatless" | "chicken" | "turkey" | "other";
    rating: number;
    source: string;
    _id?: mongodb.ObjectId;
}