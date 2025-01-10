class icoGlyphConstructor {
  constructor({
    name = "default-name",
    path = {},
    metadata = {},
    spec = {},
  } = {}) {
    this.name = name;

    // Initialize path

    this.path = { ...path };

    // Initialize metadata
    this.metadata = {};

    if (metadata.author) this.metadata.author = metadata.author;
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

    // Initialize spec
    this.spec = {};

    this.spec.defaultPath = spec.defaultPath || "default";

    if (spec.viewBox) this.spec.viewBox = spec.viewBox;
  }

  toJSON() {
    return {
      path: this.path,
      metadata: this.metadata, // Include grouped metadata
      spec: this.spec,
    };
  }
}

module.exports = icoGlyphConstructor;
