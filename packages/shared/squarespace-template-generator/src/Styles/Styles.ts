/**
 * The CSS files to be used on the website.
 *
 * @param src - the path to the CSS file
 *
 * @param preprocess - whether to preprocess the file with 'less', 'postcss', or 'tailwind'
 *
 * {@link https://developers.squarespace.com/template-overview}
 */
export interface SquarespaceStyle {
  src: string,
  preprocess?: false | 'less' | 'postcss' | 'tailwind'
}
