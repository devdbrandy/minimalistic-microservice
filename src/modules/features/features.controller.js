import ThumbnailService from '@services/thumbnail.service';
import JsonPatchService from '@services/jsonpatch.service';

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

  static jsonPatch(req, res) {
    const { document, patch } = req.body;
    const result = JsonPatchService.applyPatch(document, patch);

    return res.json(result);
  }
}

export default FeaturesController;
