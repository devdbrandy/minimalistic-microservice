const { Router } = require('express');
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Welcome to Node.js Microservice' });
});

module.exports = router;
