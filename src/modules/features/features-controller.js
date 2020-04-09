const createError = require('http-errors');
const Jimp = require('jimp');
const jsonpatch = require('fast-json-patch');
const { getDateFormat } = require('../../helpers/utils');

class FeaturesController {
  static async createThumbnail(req, res, next) {
    const allowedImages = ['gif', 'jpg', 'png'];
    const { imageUrl } = req.body;
    const fileExt = imageUrl.split('.').pop(); // extract file extension

    if (!allowedImages.includes(fileExt)) {
      return next(
        createError(
          400,
          'Oop, something is not right. Please check your image url and try again.'
        )
      );
    }

    const storageDir = 'public/thumbnails';

    try {
      const image = await Jimp.read(imageUrl);
      const filename = `${storageDir}/thumb-${getDateFormat()}.${image.getExtension()}`;

      image.resize(50, 50).write(filename);
      return res.json({ task: 'Thumbnail successfully created.' });
    } catch (error) {
      return next(
        createError(
          500,
          'Oop, something went wrong while processing image. Please try again later.'
        )
      );
    }
  }

  static jsonPatch(req, res, next) {
    const { document, patch } = req.body;

    const jsonDocument = JSON.parse(document);
    const documentPatch = JSON.parse(patch);
    const result = jsonpatch.applyPatch(jsonDocument, documentPatch)
      .newDocument;
    return res.json(result);
  }
}

module.exports = FeaturesController;
