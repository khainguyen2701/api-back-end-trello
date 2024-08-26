import express from 'express';
import { connectToMongoDB, getDatabase } from './config/mongodb';

const startServer = () => {
  const app = express();

  const hostname = 'localhost';
  const port = 8017;

  app.get('/', async (req, res) => {
    console.log('Hello', await getDatabase().listCollections().toArray());
    res.end('<h1>Hello World!</h1><hr>');
  });

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Khai.Dev27, I am running at ${hostname}:${port}/`);
  });
};

connectToMongoDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.log({ err });
    process.exit(0);
  });
