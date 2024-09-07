/* eslint-disable no-console */
import exitHook from 'async-exit-hook';
import express from 'express';
import { env } from './config/environment';
import { closeMongoDBConnection, connectToMongoDB } from './config/mongodb';
import {
  actionResponseMiddleware,
  errorHandlingMiddleware
} from './middlewares';
import { APIs_v1 } from './routes/v1';

const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(actionResponseMiddleware);
  app.use('/v1', APIs_v1);

  app.use(errorHandlingMiddleware);

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>');
  });

  app.listen(env.app_port, env.app_host, () => {
    console.log(
      `Hello ${env.author}, I am running at ${env.app_host}:${env.app_port}/`
    );
  });

  exitHook(() => {
    closeMongoDBConnection();
  });
};

(async () => {
  try {
    await connectToMongoDB();
    startServer();
  } catch (error) {
    process.exit(0);
  }
})();
