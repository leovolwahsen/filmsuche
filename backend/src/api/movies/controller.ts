import { Request, Response } from "express";
import { moviesCollections } from "../../config/database";

export const createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMovie = req.body;
        const result = moviesCollections.insertOne(newMovie);

        res.status(201).send(result);
    } catch (error) {
        console.error("Failed to create movie: ", error);
        res.status(500).send("Failed to create movie");
    }
}

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await moviesCollections.find().toArray();

        res.send(result);
    } catch (error) {
        console.error("Failed to fetch movies: ", error);
        res.status(500).send("Failed to fetch movies");
    }
}