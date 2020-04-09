const { Router } = require('express');
const router = Router();
const Controller = require('./features.controller');
const { verifyToken } = require('../../middlewares/authenticate');
const Validator = require('../../middlewares/validator');

/* POST generate thumbnail */
router.post(
  '/thumbnail',
  Validator.validate('thumbnail'),
  verifyToken,
  Controller.createThumbnail
);

/* POST generate jsonpatch */
router.post(
  '/jsonpatch',
  Validator.validate('jsonpatch'),
  verifyToken,
  Controller.jsonPatch
);

module.exports = router;
