import express from "express";
import * as moviesController from "./controller";

export const moviesRouter = express.Router();

moviesRouter.post("/new-movie", moviesController.createMovie);
moviesRouter.get("/movies", moviesController.getAllMovies);