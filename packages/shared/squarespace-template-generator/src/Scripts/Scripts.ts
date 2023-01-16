/**
 * A Javascript file to run on the squarespace page
 *
 * @param src - the relative path to the script
 *
 * @param load - whether to load the script onto the webpage. If so, squarespace will load the script on page load. Otherwise, you will have to load it via AJAX.
 *
 * @param combine - whether squarespace should bundle this scripts with the other scripts that it loads.
 *
 * {@link https://developers.squarespace.com/template-overview}
 * {@link https://developers.squarespace.com/custom-javascript/}
 */
export interface SquarespaceScript {
  src: string,
  load: boolean,
  combine: boolean,
}
