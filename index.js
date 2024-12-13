import icoGlyphsLibrary from "./icoGlyphsLibrary.json";

function getIcoGlyph(icoGlyphName) {
  const icoGlyph = icoGlyphsLibrary[icoGlyphName];
  if (!icoGlyph) {
    console.error(`Icon not found: ${icoGlyphName}`);
    return null;
  }
  return icoGlyph;
}

const icoGlyphs = {
  get: {
    path(icoGlyphName, version) {
      const icoGlyph = getIcoGlyph(icoGlyphName);
      if (!icoGlyph) return null;

      const targetVersion = version || icoGlyph.publicVersion;
      if (!targetVersion) {
        console.error(
          `No public version for ${icoGlyphName}, please specify a version.`
        );
        return null;
      }

      const versionData = icoGlyph.version[targetVersion];
      if (!versionData) {
        console.error(
          `Version ${targetVersion} not found for icon ${icoGlyphName}`
        );
        return null;
      }

      return versionData.path;
    },

    SvgAttributes(icoGlyphName) {
      const icoGlyph = getIcoGlyph(icoGlyphName);
      if (!icoGlyph) return {};

      return {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: icoGlyph.viewBox,
      };
    },
  },

  library() {
    return icoGlyphsLibrary;
  },
};

export default icoGlyphs;
