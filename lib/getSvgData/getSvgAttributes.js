import searchIcoGlyph from "../searchIcoGlyph";

/**
 * @dev In some cases, it is necessary to convert the object to a string.
 * @param {string} icoGlyphName - The name of the icoGlyph.
 * @returns {object} The attributes to set in the SVG header.
 */
function getSvgAttributes(icoGlyphName) {
  const icoGlyph = searchIcoGlyph(icoGlyphName);
  if (!icoGlyph) return;

  const ariaLabel = icoGlyph.metadata.publicName
    ? icoGlyph.metadata.publicName
    : icoGlyphName;

  const viewBox = icoGlyph.spec.viewBox ? icoGlyph.spec.viewBox : "0 0 100 100";

  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: viewBox,
    focusable: false, // ?
    "data-icoGlyph": icoGlyphName,
    role: "img",
    "aria-label": ariaLabel,
  };
}

export default getSvgAttributes;
