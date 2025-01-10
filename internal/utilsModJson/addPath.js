const readAndUpdateJSON = require("./utils/fileUtils/readAndUpdateJSON"); // Import of the centralized function
const { askForConfirmation } = require("./utils/fileUtils/readLine");

/**
 * Update or add path
 * _________________________
 *
 * @param {String} glyphName - The name of the icoGlyph to update.
 * @param {String} namePath - The specific path to be updated within the glyph.
 * @param {String} path - The SVG path to add or modify.
 * @returns {Promise<void>}
 */
async function addPath(glyphName, namePath, path) {
  await readAndUpdateJSON(async (jsonData) => {
    const glyph = jsonData.svgData[glyphName];

    // Check if the glyph exists
    if (!glyph) {
      console.error(
        `Error: The icoGlyph with the name "${glyphName}" does not exist.`
      );
      return;
    }

    // Check if the path already exists
    if (glyph.path[namePath]) {
      const confirmOverwrite = await askForConfirmation(
        `Warning: The path "${namePath}" already exists. Do you want to overwrite it? (y/n): `
      );

      // If user does not confirm overwrite, exit the function
      if (!confirmOverwrite) {
        console.log(`The path "${namePath}" will not be overwritten.`);
        return;
      }
    }

    // Add or update the path
    glyph.path[namePath] = path;

    console.log(`Path for "${glyphName}" at "${namePath}" has been updated.`);

    // Assuming readAndUpdateJSON handles the saving logic after modifications.
  });
}

/**
 * @title - Modify path
 * _______________________________________
 *
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @param {string} namePath - The name of the path to update or add.
 * @param {string|array} path - The SVG path data (can be a string or an array of path segments).
 */

const optionsForPushingInArray = {
  icoGlyphName: "3",
  namePath: "up",
  path: ["dss", "dsdsd"],
};

/** @function - Add or modify the path */
addPath(
  optionsForPushingInArray.icoGlyphName,
  optionsForPushingInArray.namePath,
  optionsForPushingInArray.path
);
