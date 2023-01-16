/**
 * The template-wide configuration for the squarespace website.
 *
 * @param name - the name of the template
 *
 * @param author - the name of the person or company who made the template
 *
 * @param layouts - an object that contains a 'default' {@link SquarespaceTemplateLayout | layout} and zero or more additional layouts.
 *
 * @param navigations - an array of {@link SquarespaceNavigation | navigation} configurations.
 *
 * @param stylesheets - an array of the relative paths to each {@link SquarespaceStyle}. This array specifies the order in which the stylesheets will be merged. Note that rules in subsequent stylesheets override rules with the same name in previous stylesheets. Also note that this array should NOT contain a 'reset.css' file. If you include a stylesheet named 'reset.css' Squarespace will automatically include it at the very top of the merged stylesheet.
 *
 * @param systemCollections - an array of one or more of the squarespace-defined {@link SquarespaceCollection | collections} you would like to include in this template. Can be zero or more of 'album', 'blog', 'events', 'gallery', or 'products' - each of which are types of content that users can add to their website via the squarespace editor.
 *
 *
 * {@link https://developers.squarespace.com/template-configuration}
 */
export interface SquarespaceTemplateConfig {
  name: string,
  author: string,
  layouts: SquarespaceTemplateLayouts
  navigations: Array<SquarespaceNavigation>
  stylesheets: Array<string> // todo: warn
  systemCollections?: Array<'album' | 'blog' | 'events' | 'gallery' | 'products'>
}

/**
 * @param default - the layout to use if no other layouts apply or have been defined
 *
 * @param layoutName - This should be one of `homepage`, or the name of a {@link https://developers.squarespace.com/collections | collection} or {@link https://developers.squarespace.com/folders-indexes | folder}. The {@link SquarespaceTemplateLayout | layout} you assign to this name will determine which layout the homepage, collection or folder uses.
 *
 */
export interface SquarespaceTemplateLayouts {
  default: SquarespaceTemplateLayout,
  [layoutName: string]: SquarespaceTemplateLayout,
}

/**
 * a layout, which is a combination of `{@link SquarespaceRegion | regions}
 *
 * @param name - the name of the layout.
 *
 * @param regions - an array of the names of the {@link SquarespaceRegion | regions} to include in the layout. Regions will be added to the layout in the order they are specified in the array.
 *
 * {@link https://developers.squarespace.com/layouts-regions/ Squarespace - layouts and regions}
 */
export interface SquarespaceTemplateLayout {
  name: string,
  regions: Array<string>
}

/**
 * A user-configurable list of links. You can make as many of these as you want. Each list accepts an unlimited number of items.
 *
 * @param title - the name of the navigation to display in the squarespace editor
 *
 * @param name - the ID of the navigation. This is how you will access the navigation in navigation tags within squarespace {@link https://developers.squarespace.com/what-is-json-t | JSON-T }. Note that each name must be unique!
 *
 * To use a navigation in a template, you need to use the `squarespace.navigation` tag.
 * @example
 * ```html
 *
 *    <squarespace:navigation navigationId="mainNav" template="navigation"/>
 *    <!-- populates blocks/navigation.block with the items in mainNav -->
 *
 * ```
 * Note that the template you use needs to accomodate an unknown number of navigation items. Also note that this object defines a LIST of links. It does not define the appearance of the list.
 *
 */
export interface SquarespaceNavigation {
  title: string,
  name: string // todo: make sure each name is unique
}
