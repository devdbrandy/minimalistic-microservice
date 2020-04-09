const jsonpatch = require('fast-json-patch');

class JsonPatchService {
  static async applyPatch(document, patch) {
    const jsonDocument = JSON.parse(document);
    const documentPatch = JSON.parse(patch);

    return jsonpatch.applyPatch(jsonDocument, documentPatch).newDocument;
  }
}

module.exports = JsonPatchService;
