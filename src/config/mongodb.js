const DB_PASSWORD = 'BoSxCIMlRvROdi9l';
export const MONGODB_URI = `mongodb+srv://nguyenvankhai2701:${DB_PASSWORD}@cluster0.uh7ridd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const DB_NAME = 'khai-dev-27-mern-trello';

import { MongoClient, ServerApiVersion } from 'mongodb';
let trelloDBInstance = null;
const clientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const connectToMongoDB = async () => {
  await clientInstance.connect();

  trelloDBInstance = clientInstance.db(DB_NAME);
};

export const getDatabase = () => {
  if (!trelloDBInstance) {
    throw new Error('Must connect to MongoDB first!');
  }
  return trelloDBInstance;
};
