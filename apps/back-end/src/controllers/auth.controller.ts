import express from 'express';
import * as authService from 'src/services/auth/auth.service';
import refreshAuthorizationMiddleware from 'src/common/middleware/refreshAuthorization.middleware';

const authController = express.Router();

authController.post('/register', authService.register);
authController.post('/login', authService.login);
authController.get('/logout', authService.logout);
authController.use('/token', refreshAuthorizationMiddleware);
authController.get('/token', authService.getToken);

export default authController;
