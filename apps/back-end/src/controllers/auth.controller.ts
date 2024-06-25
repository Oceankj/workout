import express from 'express';
import * as authService from '../services/auth.service';

const authController = express.Router();

authController.post('/register', authService.register);

export default authController;
