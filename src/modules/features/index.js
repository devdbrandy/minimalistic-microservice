const { Router } = require('express');
const router = Router();
const controller = require('./features-controller');

/* POST generate thumbnail */
router.post('/thumbnail', controller.createThumbnail);

/* POST generate jsonpatch */
router.post('/jsonpatch', controller.jsonPatch);

module.exports = router;
