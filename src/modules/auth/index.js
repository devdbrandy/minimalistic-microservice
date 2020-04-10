import { Router } from 'express';
import Controller from './auth.controller';
import Validator from '../../middlewares/validator';

const router = Router();

/* POST authenticate user. */
router.post('/login', Validator.validate('login'), Controller.login);

export default router;
