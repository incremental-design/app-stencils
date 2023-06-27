/**
 * Snippets that can be re-used across multiple {@link SquarespacePage | pages}. A block can be as small as a single DOM node, or as large as entire section. Blocks are also composable.
 *
 * Each Squarespace block is placed in the `blocks` folder
 *
 * @param template - a {@link https://developers.squarespace.com/what-is-json-t | JSON-T} string that describes the appearance of the block.
 *
 * @example
 * ```html
 *
 *    <!-- user-profile.block - a block that contains a single element -->
 *      <svg class="user-profile" viewBox="0 0 1 1">
 *        <use class="use--odd" xlink:href="/assets/ui-icons.svg#accounts-icon--odd"></use>
 *      </svg>
 *
 *    <!-- user-avatar.block - a block that re-uses user-profile.block -->
 *      <div class="user-avatar">
 *        <@|apply user-profile.block/>
 *        <h1>{collection.user.name}</h1>
 *        <p>{collection.user.biography}</p>
 *      </div>
 * ```
 *
 * {@link https://developers.squarespace.com/template-overview}
 */
export interface SquarespaceBlock {
  template: string,
}
