import express from "express";
import * as messagesController from "./controller";

export const messagesRouter = express.Router();

messagesRouter.post("/new-message", messagesController.createMessage);
messagesRouter.get("/messages", messagesController.getMessages);