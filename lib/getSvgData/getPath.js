import searchIcoGlyph from "../searchIcoGlyph";

/**
 * @param {string | [string, string][]} icoGlyphName - The name of the icoGlyph or an array of [glyphName, pathName].
 * @param {string} [pathNameData] - The name of the path, defaults to the value in icoGlyph.spec.defaultPath.
 * @returns {string} The path of the svg.
 */
function getPath(icoGlyphName, pathNameData) {
  // Handle array of icoGlyphName recursively
  if (Array.isArray(icoGlyphName)) {
    return icoGlyphName
      .map(([glyphName, pathName]) => getPath(glyphName, pathName))
      .join(" ");
  }

  const icoGlyph = searchIcoGlyph(icoGlyphName);
  if (!icoGlyph) return;

  // return the defaultPath if the pathNameData is not defined
  const pathName = pathNameData || icoGlyph.spec.defaultPath;

  const icoGlyphPath = icoGlyph.path[pathName];

  // Check if the specified pathName exists
  if (!icoGlyphPath) {
    console.error(
      `The path "${pathName}" does not exist in the icoGlyph "${icoGlyphName}".`
    );
    return;
  }

  // Handle array of paths or return single path directly
  return Array.isArray(icoGlyphPath)
    ? icoGlyphPath
        .map(([subGlyphName, subPathName]) =>
          getPath(subGlyphName, subPathName)
        )
        .join(" ")
    : icoGlyphPath;
}

export default getPath;
