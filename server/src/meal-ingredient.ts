import * as mongodb from "mongodb";

export interface MealIngredient {
    mealId: string;
    ingredientId: string;
    quantity: number;
    measurement: string;
    _id?: mongodb.ObjectId;
}