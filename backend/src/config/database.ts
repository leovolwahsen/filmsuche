import { MongoClient, Db, Collection, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@filmsuche.l9jxt.mongodb.net/?retryWrites=true&w=majority&appName=filmsuche`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    tls: true, 
    tlsAllowInvalidCertificates: false, 
});

export let db: Db;
export let moviesCollections: Collection;
export let favoritesCollections: Collection;
export let messagesCollections: Collection;

export async function connectToDatabase(): Promise<void> {
    try {
        console.log("Attempting to connect to MongoDB...");
        await client.connect();

        db = client.db("filmsuche");
        moviesCollections = db.collection("movies");
        favoritesCollections = db.collection("favorites");
        messagesCollections = db.collection("messages");

        console.log("Connected to MongoDB and initialized collections");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}
