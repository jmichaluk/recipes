import * as mongodb from "mongodb";
import { Meal } from "./meal";
import { Ingredient } from "./ingredient";
import { MealIngredient } from "./meal-ingredient";

export const collections: { 
    meals?: mongodb.Collection<Meal>;
    ingredients?: mongodb.Collection<Ingredient>;
    mealIngredients?: mongodb.Collection<MealIngredient>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("recipes");
    await applySchemaValidation(db);

    const mealsCollection = db.collection<Meal>("meals");
    collections.meals = mealsCollection;

    const ingredientsCollection = db.collection<Ingredient>("ingredients");
    collections.ingredients = ingredientsCollection;

    const mealIngredientsCollection = db.collection<MealIngredient>("mealIngredients");
    collections.mealIngredients = mealIngredientsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Recipe model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const mealjsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "type"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                type: {
                    bsonType: "string",
                    description: "'type' is required and is one of 'meatless', 'chicken', 'turkey', or 'other'",
                    enum: ["meatless", "chicken", "turkey", "other"],
                },
                rating: {
                    bsonType: "number",
                    description: "'rating' is a number",
                }
            },
        },
    };
    const ingredientjsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                }
            },
        },
    };
    const mealIngredientsjsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["mealId", "ingredientId", "measurement", "quantity"],
            additionalProperties: false,
            properties: {
                _id: {},
                mealId: {
                    bsonType: "string",
                    description: "mealId is required and is a String representing a Meal from the meals collection."
                },
                ingredientId: {
                    bsonType: "string",
                    description: "ingredientId is required and is a String representing an Ingredient from the ingredients collection."
                },
                measurement: {
                    bsonType: "string",
                    description: "'measurement' is required and is a string."
                },
                quantity: {
                    bsonType: "number",
                    description: "'quantity' is required and is a number."
                }
            }
        }
    }
  
    // Try applying the modification to the meals collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "meals",
        validator: mealjsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("meals", {validator: mealjsonSchema});
        }
    });
    
    // Try applying the modification to the ingredients collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "ingredients",
        validator: ingredientjsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("ingredients", {validator: ingredientjsonSchema});
        }
    });

    // Try applying the modification to the mealIngredients collection. If the collection doesn't exist, create it.
    await db.command({
        collMod: "mealIngredients",
        validator: mealIngredientsjsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("mealIngredients", {validator: mealIngredientsjsonSchema});
        }
    });
 }