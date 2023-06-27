/**
 * A single web page that cannot be modified by a squarespace user.
 *
 * @param template - a {@link https://developers.squarespace.com/what-is-json-t | JSON-T } that describes the appearance of the page.
 *
 * @param config - a {@link SquarespacePageConfig}
 *
 * {@link https://developers.squarespace.com/static-pages | Squarespace - Static Pages}
 */
export interface SquarespacePage {
  template: string,
  config: SquarespacePageConfig
}

export interface SquarespacePageConfig {
}
