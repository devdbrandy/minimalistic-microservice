const ThumbnailService = require('../../services/thumbnail.service');
const JsonPatchService = require('../../services/jsonpatch.service');

class FeaturesController {
  static async createThumbnail(req, res, next) {
    const { imageUrl } = req.body;

    try {
      const imageLink = await ThumbnailService.generateThumbnail(imageUrl);

      return res.json({
        message: 'Thumbnail successfully created.',
        link: imageLink
      });
    } catch (error) {
      return next(error);
    }
  }

  static jsonPatch(req, res, next) {
    const { document, patch } = req.body;
    const result = JsonPatchService.patch(document, patch);
    return res.json(result);
  }
}

module.exports = FeaturesController;
