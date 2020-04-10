import { Router } from 'express';
import Controller from './features.controller';
import AuthGuard from '../../middlewares/authenticate';
import Validator from '../../middlewares/validator';

const router = Router();

/* POST generate thumbnail */
router.post(
  '/thumbnail',
  Validator.validate('thumbnail'),
  AuthGuard.verifyToken,
  Controller.createThumbnail
);

/* POST generate jsonpatch */
router.post(
  '/jsonpatch',
  Validator.validate('jsonpatch'),
  AuthGuard.verifyToken,
  Controller.jsonPatch
);

export default router;
