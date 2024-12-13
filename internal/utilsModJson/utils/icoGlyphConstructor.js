const { v4: uuidv4 } = require("uuid");

class icoGlyphConstructor {
  constructor({
    name = "default-name",
    id = uuidv4(),
    version = {
      number: "0.1.0",
      versionDate: Date.now(),
      path: "",
      author: "L",
    },
    viewBox = "0 0 100 100",
    metadata = {},
    publicVersion = null, // Default: null means the icon is private
  } = {}) {
    this.name = name;
    this.id = id;

    // The version is now an object where the key is the version number
    this.version = {
      [version.number]: {
        versionDate: version.versionDate || Date.now(),
        path: version.path,
        author: version.author || "L",
      },
    };

    // Add `versionNote` only if provided
    if (version.versionNote) {
      this.version[version.number].versionNote = version.versionNote;
    }

    this.latestVersion = version.number;
    this.publicVersion = publicVersion;
    this.viewBox = viewBox;

    // Initialize metadata
    this.metadata = {};

    if (metadata.publicName) this.metadata.publicName = metadata.publicName;
    if (metadata.family) this.metadata.family = metadata.family;
    if (metadata.category) this.metadata.category = metadata.category;
    if (metadata.tags) this.metadata.tags = [...new Set(metadata.tags)]; // If tags provided
    if (metadata.description) this.metadata.description = metadata.description;

    // Do not create notes if not provided
    if (metadata.notes) {
      this.metadata.notes = {};
      if (metadata.notes.userNote)
        this.metadata.notes.userNote = metadata.notes.userNote;
      if (metadata.notes.devNote)
        this.metadata.notes.devNote = metadata.notes.devNote;
    }
  }

  // Method to set a version as stable
  setpublicVersion(versionNumber) {
    if (!this.version[versionNumber]) {
      throw new Error(`Version "${versionNumber}" does not exist.`);
    }
    this.publicVersion = versionNumber;
  }

  toJSON() {
    return {
      name: this.name,
      id: this.id,
      viewBox: this.viewBox,
      version: this.version,
      latestVersion: this.latestVersion,
      publicVersion: this.publicVersion, // Include in JSON output
      metadata: this.metadata, // Include grouped metadata
    };
  }
}

module.exports = icoGlyphConstructor;
