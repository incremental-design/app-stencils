/**
 * Groups of content that will populate the {@link SquarespaceBlock | blocks} and {@link SquarespacePage | pages} on the site.
 *
 * @param template - a {@link https://developers.squarespace.com/what-is-json-t | JSON-T } string that describes what a group of content (e.g. blog posts) looks like
 *
 * @param item - a {@link https://developers.squarespace.com/what-is-json-t | JSON-T } string that describes what the page for an individual piece of content (e.g. a single blog post) looks like
 *
 * @param config - a {@link SquarespaceCollectionConfig}
 *
 * {@link https://developers.squarespace.com/template-overview}
 */
export interface SquarespaceCollection {
  template: string,
  item: string,
  config: SquarespaceCollectionConfig
}

/**
 *
 * @param title - the name of the collection that will display in the squarespace editor's 'add new page dialog'. If you use one of the {@link SquarespaceTemplateConfig.systemCollections | system collections}, this collection will override the system collections
 *
 * @param ordering - the order in which collection items should be listed. Can be one of 'chronological', 'user-orderable', or 'calendar'
 *
 * @param addText - the text to display in the 'add' button of the squarespace interface. E.g. 'add post', 'add photo'
 *
 * @param acceptTypes - the types of content that can be added to the collection. Can be one or more of 'text', 'image', 'audio', 'video' or 'event
 *
 * @param pageSize - the max number of items to show on a single page. This should be a positive number.
 *
 *
 * @param supportsVideoBackgrounds - whether the collection supports video backgrounds
 *
 *
 */
export interface SquarespaceCollectionConfig {
  title: string, // todo: make sure it is not 'album'
  ordering: 'chronological' | 'user-orderable' | 'calendar',
  addText: string,
  acceptTypes: Array<'text' | 'image' | 'video' | 'audio' | 'event'>,
  pageSize: number, // fail if negative number or zero
  supportsVideoBackgrounds: boolean, //wtf does this mean?
}

/**
 * The configuration for a folder. Folders group collections together. Users can make as many folders as they want, and group any number of collections within each one. Folders show up as sub-navigations in squarespace websites. Folders cannot be nested.
 *
 * @param title - the name of the folder
 *
 * @param newTitle - the prompt to show users when they want to add a new folder
 *
 * @param addText - the prompt to show the user when they add a collection to a folder
 *
 * @param icon - the icon that should represent the folder in the squarespace editor
 *
 * {@link https://developers.squarespace.com/folders-indexes | Squarespace - folders and indexes}
 *
 */
export interface SquarespaceFolderConfig{
  title: string, // should default to "Folder"
  newTitle: string, // should default to 'New Folder'
  // folder: true, - // this will always be true by virtue of being included, so no need to specify it here.
  addText: string, // should default to 'add content'
  icon: string // should default to 'folder'
}

/**
 * a folder that also has a page that displays its contents. Unlike regular {@link SquarespaceFolderConfig | folders}, indices don't just make navigation submenus. They also make pages that show the content they contain. Note that these pages can't be customized, the way that {@link SquarespaceCollectionConfig.template | collection templates} can. Instead, they can be one of {@link SquarespaceIndexConfig.indexType | "stacked" or "grid" }
 *
 * @param item - the {@link https://developers.squarespace.com/what-is-json-t | JSON-T } to use to display each index item.
 *
 * {@link https://developers.squarespace.com/folders-indexes | Squarespace - Folders and Indexes}
 */
export interface SquarespaceIndex{
  item: string,
  config: SquarespaceIndexConfig
}

/**
 * The configuration for an index. Indices are {@link SquarespaceFolderConfig | folders} that also have a page that shows some, or all of the collections in the folder.
 *
 * @param title - the name of the index
 *
 * @param newTitle - the prompt to show users when they want to add a new index
 *
 * @param addText - the prompt to show the user when they add a collection to a index
 *
 * @param icon - the icon that should represent the folder in the squarespace editor
 *
 * @param fullData - whether to show the entire collection item, or just a small piece of it
 *
 * @param indexType - one of "stacked" or "grid" depending on how the collection items should be arranged.
 *
 * {@link https://developers.squarespace.com/folders-indexes | Squarespace - Folders and Indexes}
 */
export interface SquarespaceIndexConfig{
  title: string, // should default to "Index"
  newTitle: string,
  // folder: true, // all indices are folders. So, this can be omitted from here
  // index: true, // this will always be true, so it can be omitted from here
  addText: string, // should default to 'add content'
  icon: string, // should default to folder
  fullData: boolean, // wtf is this??
  indexType: "stacked" | "grid"
}
