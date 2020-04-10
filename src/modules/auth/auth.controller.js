import JWTService from '@services/jwt.service';

class AuthController {
  static login(req, res) {
    const { username, password } = req.body;
    const token = JWTService.sign({ username });

    return res.json({ token });
  }
}

export default AuthController;
