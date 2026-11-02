// The backdrops of Tranquility and Biodiversity are painted from the reference page (stitched from its scroll
// video, see src/assets/scenes). That page is 1280px wide and one 960px screen of it matches one 900-unit
// screen of artwork, centred in the 1600-wide artwork; the plates were widened 213px a side for 16:9 screens.
export const PX = 900 / 960
const EXT = 213

export const pageX = (px) => 200 + px * PX

// Rect [x, y, w, h] in artwork units for page area x0..x1, y0..y1, with page row `origin` at artwork y `at`
export function pageRect(x0, y0, x1, y1, origin, at) {
  return [pageX(x0), at + (y0 - origin) * PX, (x1 - x0) * PX, (y1 - y0) * PX]
}

// A widened plate cut from page rows top..bottom
export const plateRect = (top, bottom, origin, at) => pageRect(-EXT, top, 1280 + EXT, bottom, origin, at)
