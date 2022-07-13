import * as mongodb from "mongodb";
import { Meal } from "./meal";

export const collections: { 
    meals?: mongodb.Collection<Meal>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("recipes");
    await applySchemaValidation(db);

    const mealsCollection = db.collection<Meal>("meals");
    collections.meals = mealsCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Menu model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
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
  
    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: "meals",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("meals", {validator: jsonSchema});
        }
    });
 }