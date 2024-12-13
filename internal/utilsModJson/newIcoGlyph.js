const icoGlyphConstructor = require("./utils/icoGlyphConstructor"); // Import of the IcoGlyph class
const readAndUpdateJSON = require("./utils/fileUtils/readAndUpdateJSON"); // Import of the centralized function

/**
 * @param {Object} glyphData - Data of the element to add. Parameters can be partial (default values will be used).
 * @returns {Promise<void>}
 */
async function addNewIcoGlyph(glyphData) {
  return readAndUpdateJSON(async (jsonData) => {
    const newGlyph = new icoGlyphConstructor(glyphData);
    if (jsonData.hasOwnProperty(newGlyph.name)) {
      console.error(
        `Err: An icoGlyph with the name "${newGlyph.name}" already exists.`
      );
      return;
    }
    jsonData[newGlyph.name] = newGlyph.toJSON();
    console.log(`New element "${newGlyph.name}" added.`);
  });
}

/**
 * @title - Add New Glyph
 * __________________________
 *
 * @param {string} name - icoGlyph name to add
 * @param {string} [id = uuidv4] - Id is automatically created
 * @param {string} [viewBox='0 0 100 100']
 * @param {string} [aspectRatio='1:1']
 * @param {string} [author='L']
 * @param {string} [version.number="0.1.0"]
 * @param {string} version.path
 * @param {string} [publicVersion=null] - Set the same version.number for the version to be public; otherwise, it will be `null` and thus private
 * MetaData
 * @param {string} [metadata.publicName] - optional
 * @param {array} [metadata.family] - optional
 * @param {array} [metadata.category] - optional
 * @param {array} [metadata.tags] - optional
 * @param {string} [metadata.userNote] - optional
 * @param {string} [metadata.devNote] - optional
 */
const newIcoGlyph = {
  name: "24",
  // viewBox: "",
  // aspectRatio: "",
  version: {
    number: "0.1.0", // Specify the first version
    path: "M 10 10 L 65 35 L 90 35 M 10 65 L 35 65 L 35 90 M 90 10 L 10 90",
    // author: "L",
  },
  // publicVersion: "0.1.0", // If not specified, will be null and considered non-public
  metadata: {
    // publicName: "",
    // family: [],
    // category: [],
    // tags: [],
    // description: "",
    // notes: {
    // userNote: "",
    // devNote: "",
    // },
  },
};
/** @function */
addNewIcoGlyph(newIcoGlyph);
