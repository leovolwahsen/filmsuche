import express from "express";
import * as favoritesController from "./controller";

export const favoritesRouter = express.Router();

favoritesRouter.post("/new-favorite", favoritesController.createFavorite);
favoritesRouter.get("/favorites", favoritesController.getAllFavorites);