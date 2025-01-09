const readAndUpdateJSON = require("./utils/fileUtils/readAndUpdateJSON"); // Import of the centralized function

/**
 * Add New Version
 * _________________________
 */
async function newVersion(glyphName, versionData, options = {}) {
  await readAndUpdateJSON(async (jsonData) => {
    const glyph = jsonData.svgData[glyphName];

    // Check if the glyph exists
    if (!glyph) {
      console.error(
        `Error: The icoGlyph with the name "${glyphName}" does not exist.`
      );
      return;
    }

    const currentVersion = glyph.latestVersion || "0.0.0";
    const [major, minor, patch] = currentVersion
      .split(".")
      .map((num) => parseInt(num, 10));

    let newVersion;

    // Use switch to handle version types
    switch (options.versionType) {
      case "major":
        newVersion = `${major + 1}.0.0`;
        break;
      case "minor":
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case "patch":
        newVersion = `${major}.${minor}.${patch + 1}`;
        break;
      default:
        console.error(
          "Error: The update type (versionType) must be 'major', 'minor', or 'patch'."
        );
        return;
    }

    // Add information for the new version
    glyph.version[newVersion] = {
      versionDate: versionData.versionDate || Date.now(),
      path: versionData.path || "",
      author: versionData.author || "L",
    };

    // Add version note, if present
    if (versionData.versionNote) {
      glyph.version[newVersion].versionNote = versionData.versionNote;
    }

    // Update the latest version and public version if needed
    glyph.latestVersion = newVersion;

    if (options.setPublic) {
      glyph.publicVersion = newVersion;
    }

    console.log(
      `New version "${newVersion}" added to the glyph "${glyphName}".`
    );
    if (options.setPublic) {
      console.log(
        `The version "${newVersion}" has been set as the public version.`
      );
    }
  });
}

/**
 * @title - Add New Version
 * _____________________
 *
 * @param {string} name - icoGlyph name to add
 * @param {string} path
 * @param {string} [versionNote] - You can add a note to this version
 * @param {"major" | "minor" | "patch"} versionType - Update the number of this new version
 * @param {boolean} setPublic - If true, this version will be set as the public version
 */
const newVersionData = {
  icoGlyphName: "1",

  versionData: {
    path: "M 10 10 L 20 20 L 30 30",
    author: "L",
    versionNote: "", // Add note if needed
  },

  options: {
    versionType: "minor", // Type of update ("major", "minor", or "patch")
    setPublic: false, // This version becomes public if true
  },
};

/** @function */
newVersion(
  newVersionData.icoGlyphName,
  newVersionData.versionData,
  newVersionData.options
);
