const { body, validationResult } = require('express-validator');

class Validator {
  static get routes() {
    return {
      login: [
        body(
          'username',
          "'username' is required and must exceed 2 characters"
        ).isLength(3),
        body(
          'password',
          "'password' is required and must exceed 4 characters"
        ).isLength(5)
      ],
      thumbnail: [
        body(
          'imageUrl',
          "'imageUrl' is required and must be a valid url"
        ).isURL({
          require_protocol: true
        })
      ],
      jsonpatch: [
        body('document', "'document' must be a json object").isJSON(),
        body('patch', "'patch' must be json").isJSON()
      ]
    };
  }

  static validate(route) {
    return [Validator.routes[route], Validator.validationResult];
  }

  static validationResult(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
}

module.exports = Validator;
