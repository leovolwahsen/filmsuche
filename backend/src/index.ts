import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import { moviesRouter } from "./api/movies/routers";
import { favoritesRouter } from "./api/favorites/routers";
import { messagesRouter } from "./api/messages/routers";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initiate MongoDB connection 
connectToDatabase().then(() => {
    console.log("Database connected successfully");

    // Register routes
    app.use("/", moviesRouter);
    app.use("/", favoritesRouter);
    app.use("/", messagesRouter);

    app.get("/", (req: Request, res: Response) => {
        res.send("Welcome to the backend server of filmsuche!");
    });

    // Start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Failed to connect to database: ${error}`);
    process.exit(1);
});
