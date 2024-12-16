import searchIcoGlyph from "../searchIcoGlyph";

/**
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @param {string} [icoGlyphVersion] - The version of the icoGlyph (optional).
 * @returns {string} The path of the icoGlyph for the specified version.
 */
function getPath(icoGlyphName, icoGlyphVersion) {
  const icoGlyph = searchIcoGlyph(icoGlyphName);
  if (!icoGlyph) return;

  const targetVersion = icoGlyphVersion || icoGlyph.publicVersion;
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
}
export default getPath;
