import { MongoClient } from "mongodb"
import { env } from './environment'

let dbInstance = null

export const connectDB = async () => {
    const client = new MongoClient(env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    //connect the client to the server
    await client.connect()

    //assign the clientDb to Instance
    dbInstance = client.db(env.DATABASE_NAME);
}

// get dbInstance

export const getDB = () => {
    if (!dbInstance) throw new Error("Where is your db ??? bozo");
    return dbInstance;
  };

