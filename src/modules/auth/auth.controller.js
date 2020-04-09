const JWTService = require('../../services/jwt.service');

class AuthController {
  static login(req, res) {
    const { username, password } = req.body;
    const token = JWTService.sign({ username });

    return res.json({ token });
  }
}

module.exports = AuthController;
