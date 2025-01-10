const icoGlyphConstructor = require("./utils/icoGlyphConstructor"); // Import of the IcoGlyph class
const readAndUpdateJSON = require("./utils/fileUtils/readAndUpdateJSON"); // Import of the centralized function

/**
 * @param {Object} glyphData - Data of the element to add. Parameters can be partial (default values will be used).
 */
async function addNewIcoGlyph(glyphData) {
  return readAndUpdateJSON(async (jsonData) => {
    const newGlyph = new icoGlyphConstructor(glyphData);
    if (jsonData.svgData.hasOwnProperty(newGlyph.name)) {
      console.error(
        `Err: An icoGlyph with the name "${newGlyph.name}" already exists.`
      );
      return;
    }
    jsonData.svgData[newGlyph.name] = newGlyph.toJSON();
    console.log(`New element "${newGlyph.name}" added.`);
  });
}

/**
 * @title - Add New Glyph
 * __________________________
 *
 * @dev - Verify the defaultPath is correct
 *
 * @param {string} name - icoGlyph name to add - will be the key object
 *
 * path
 *    @param {object}
 *
 * metadata
 *    @param {string} [author='L']
 *    @param {array} [metadata.tags] - optional
 *    @param {string} [metadata.userNote] - optional
 *    @param {string} [metadata.devNote] - optional
 *
 * spec
 *    @param {string} [spec.viewBox] - optional - !spec.viewBox ? spec.viewBox = "0 0 100 100" : spec.viewBox
 *    @param {string} [spec.public] - optional
 *    @param {string} spec.defaultPath - !spec.defautlPath ? spec.defautlPath = "default" : spec.defautlPath
 */

const newIcoGlyph = {
  name: "2",
  path: {
    right: "M 72 50 A 1 1 0 0 0 72 50 A 1 1 0 0 0 72 50 ",
    left: "M 28 50 A 1 1 0 0 0 28 50 A 1 1 0 0 0 28 50 ",
  },
  metadata: {
    tags: ["under", "down"],
    author: "L",
    // description: "",
    // notes: {
    // userNote: "",
    // devNote: "",
    // },
  },
  spec: {
    defaultPath: "right",
    // viewBox: "0 0 90 100",
  },
};
/** @function */
addNewIcoGlyph(newIcoGlyph);
