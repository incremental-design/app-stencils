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


// note that scripts can be loaded via the <squarespace:script> tag, if you want squarespace to minify the script, or via the regular <script> tag, if you don't want squarespace to minify the script.


// when implementing this interface, need to place scripts in the site.region file. also need to allow place in header or footer

// need to scan all of the `template.conf` layouts and make sure that the `vite-script` in/out points are in each layout
