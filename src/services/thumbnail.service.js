const createError = require('http-errors');
const Jimp = require('jimp');
const { getDateFormat, getFullUrl } = require('../helpers/utils');

class ThumbnailService {
  static async generateThumbnail(imageUrl) {
    const allowedImages = ['gif', 'jpg', 'jpeg', 'png', 'svg', 'tif'];
    const fileExt = imageUrl.split('.').pop(); // extract file extension

    if (!allowedImages.includes(fileExt)) {
      throw createError(
        400,
        'Oops, something is not right. Please check your image url and try again.'
      );
    }

    const image = await Jimp.read(imageUrl);
    const storageDir = 'public/thumbnails';
    const filename = `${storageDir}/thumb-${getDateFormat()}.${image.getExtension()}`;

    image.resize(50, 50).write(filename);
    return getFullUrl(filename);
  }
}

module.exports = ThumbnailService;
