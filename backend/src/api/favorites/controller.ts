import { Request, Response } from 'express';
import { favoritesCollections } from '../../config/database';

export const createFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const newFavorite = req.body;
        const result = favoritesCollections.insertOne(newFavorite);

        res.status(201).send(result);
    } catch (error) {
        console.error("Failed to create favorite: ", error);
        res.status(500).send("Failed to create favorite");
    }
}

export const getAllFavorites = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await favoritesCollections.find().toArray();

        res.send(result);
    } catch (error) {
        console.error("Failed to fetch favorites: ", error);
        res.status(500).send("Failed to fetch favorites");
    }
}

