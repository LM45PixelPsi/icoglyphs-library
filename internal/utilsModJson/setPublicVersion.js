const readAndUpdateJSON = require("./utils/fileUtils/readAndUpdateJSON"); // Import of the centralized function

/**
 * Set Public Version
 * _________________________
 *
 * Updates the `publicVersion` of an icoGlyph based on its `latestVersion`,
 * or a specified version if provided.
 *
 * @param {string} glyphName - The name of the icoGlyph to update.
 * @param {string} [version] - The public version to set. Defaults to `latestVersion` if not provided.
 * @returns {Promise<void>}
 */
async function setPublicVersion(glyphName, version) {
  await readAndUpdateJSON(async (jsonData) => {
    const glyph = jsonData[glyphName];

    // Check if the glyph exists
    if (!glyph) {
      console.error(
        `Error: The icoGlyph with the name "${glyphName}" does not exist.`
      );
      return;
    }

    if (!version) {
      version = glyph.latestVersion;
    }

    if (!glyph.version.hasOwnProperty(version)) {
      console.error(
        `Error: The version "${version}" does not exist for "${glyphName}".`
      );
      return;
    }

    glyph.publicVersion = version;
    console.log(
      `The version "${version}" has been set as the public version for "${glyphName}".`
    );
  });
}

/**
 * @title - Set Public Version
 * ____________________
 *
 * @param {string} icoGlyphName - The name of the icoGlyph to update.
 * @param {string} [versionToSetPublic = latestVersion] - The public version to set. Defaults to `latestVersion` if not provided.
 */

const setPublicVersionData = {
  icoGlyphName: "9",

  versionToSetPublic: "0.2.0",
};

/** @function */
setPublicVersion(
  setPublicVersionData.icoGlyphName,
  setPublicVersionData.versionToSetPublic
);
