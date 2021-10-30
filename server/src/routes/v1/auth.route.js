import express from 'express';
import { login, register, logout } from '../../controllers/auth.controller.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(login);

export default router;
