import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const mealIngredientsRouter = express.Router();
mealIngredientsRouter.use(express.json());

mealIngredientsRouter.get("/", async (_req, res) => {
    try {
        const mealIngredients = await collections.mealIngredients.find({}).toArray();
        res.status(200).send(mealIngredients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

mealIngredientsRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const mealIngredient = await collections.mealIngredients.findOne(query);

        if (mealIngredient) {
            res.status(200).send(mealIngredient);
        } else {
            res.status(404).send(`Failed to find mealIngredient: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find mealIngredient: ID ${req?.params?.id}`);
    }
});

// get meal mealIngredients by meal id.
mealIngredientsRouter.get("/:mealId", async (req, res) => {
    try {
        const mealId = req?.params?.mealId;
        const query = { mealId: mealId };
        const mealIngredients = await collections.mealIngredients.find(query).toArray();

        if (mealIngredients) {
            res.status(200).send(mealIngredients);
        } else {
            res.status(404).send(`Failed to find mealIngredients for meal: ID ${mealId}`)
        }
    } catch (error) {
        res.status(404).send(`Failed to find mealIngredients for meal: ID ${req?.params?.mealId}`)
    }
})

// get meal mealIngredients by mealIngredient id.
mealIngredientsRouter.get("/:ingredientId", async (req, res) => {
    try {
        const ingredientId = req?.params?.ingredientId;
        const query = {ingredientId: ingredientId };
        const mealIngredients = await collections.mealIngredients.find(query).toArray();
        if (mealIngredients) {
            res.status(200).send(mealIngredients);
        } else {
            res.status(404).send(`Failed to find meals for ingredient: ID ${ingredientId}`)
        }
    } catch (error) {
        res.status(404).send(`Failed to find meals for ingredient: ID ${req?.params?.ingredientId}`)
    }
})

mealIngredientsRouter.post("/", async (req, res) => {
    try {
        const mealIngredient = req.body;
        const result = await collections.mealIngredients.insertOne(mealIngredient);

        if (result.acknowledged) {
            res.status(201).send(result.insertedId);
        } else {
            res.status(500).send("Failed to create a new mealIngredient.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

mealIngredientsRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const mealIngredient = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.mealIngredients.updateOne(query, { $set: mealIngredient });

        if (result && result.matchedCount) {
            res.status(200).send(id);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find mealIngredient: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update mealIngredient: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

mealIngredientsRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.mealIngredients.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed mealIngredient: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove mealIngredient: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find mealIngredient: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});