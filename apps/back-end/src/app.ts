import express from 'express';
import router from 'src/route';
import errorHandlerMiddleware from 'src/common/middleware/error.middleware';
import authorizationMiddleware from 'src/common/middleware/authorization.middleware';
import responseFormatterMiddleware from 'src/common/middleware/responseFormatter.middleware';

const app = express();

app.use(express.json());
app.use(authorizationMiddleware);
app.use(responseFormatterMiddleware);
app.use(router);
app.use(errorHandlerMiddleware);

export default app;
