import express from 'express';
import * as authService from '../services/auth.service';

const authController = express.Router();

authController.post('/register', authService.register);
authController.post('/login', authService.login);

export default authController;
