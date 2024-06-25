import express from 'express';
import router from './route';
import errorHandlerMiddleware from './common/middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
