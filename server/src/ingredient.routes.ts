import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const ingredientRouter = express.Router();
ingredientRouter.use(express.json());

ingredientRouter.get("/", async (_req, res) => {
    try {
        const ingredients = await collections.ingredients.find({}).toArray();
        res.status(200).send(ingredients);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

ingredientRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const ingredient = await collections.ingredients.findOne(query);

        if (ingredient) {
            res.status(200).send(ingredient);
        } else {
            res.status(404).send(`Failed to find ingredient: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`Failed to find ingredient: ID ${req?.params?.id}`);
    }
});

ingredientRouter.post("/", async (req, res) => {
    try {
        const ingredient = req.body;
        const result = await collections.ingredients.insertOne(ingredient);

        if (result.acknowledged) {
            res.status(201).send(`Created new ingredient: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new ingredient.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

ingredientRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const ingredient = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.ingredients.updateOne(query, { $set: ingredient });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated a ingredient: ID: ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find ingredient: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update ingredient: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

ingredientRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.ingredients.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed ingredient: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove ingredient: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find ingredient: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});