const { Router } = require('express');
const router = Router();
const controller = require('./features-controller');
const { verifyToken } = require('../../middlewares/authenticate');

/* POST generate thumbnail */
router.post('/thumbnail', verifyToken, controller.createThumbnail);

/* POST generate jsonpatch */
router.post('/jsonpatch', verifyToken, controller.jsonPatch);

module.exports = router;
