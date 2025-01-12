import { Request, Response } from 'express';
import { messagesCollections } from '../../config/database';

export const createMessage = async (req: Request, res: Response):Promise<void> => {
    try {
        const newMessage = req.body;
        const result = await messagesCollections.insertOne(newMessage);

        res.status(201).send(result);
    } catch (error) {
        console.error(`Failed to create message: ${error}`);
        res.status(500).send({ error: "Failed to create message" });
    }
}

export const getMessages = async (req: Request, res: Response):Promise<void> => {
    try {
        const result = await messagesCollections.find({}).toArray();

        res.send(result);
    } catch (error) {
        console.error(`Failed to get messages: ${error}`);
        res.status(500).send({ error: "Failed to get messages" });
    }
}

