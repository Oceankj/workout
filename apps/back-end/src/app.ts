import express from 'express';
import router from './route';

const app = express();
app.use(router);

export default app;
