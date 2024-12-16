import icoGlyphsLibrary from "./icoGlyphsLibrary.json";
import getCompletSVG from "./lib/getSvgData/getCompletSVG";
import getPath from "./lib/getSvgData/getPath";
import getSvgAttributes from "./lib/getSvgData/getSvgAttributes";
import getIcoGlyphDefaultStyle from "./lib/getSvgData/getStyle";

const icoGlyph = {
  getPath: (icoGlyphName, icoGlyphVersion) => {
    return getPath(icoGlyphName, icoGlyphVersion);
  },

  getSvgAttributes: (icoGlyphName) => {
    return getSvgAttributes(icoGlyphName);
  },

  getIcoGlyphDefaultStyle: () => {
    return getIcoGlyphDefaultStyle();
  },

  getCompletSVG: (icoGlyphName, icoGlyphVersion) => {
    return getCompletSVG(icoGlyphName, icoGlyphVersion);
  },

  library() {
    return icoGlyphsLibrary;
  },
};

export default icoGlyph;
