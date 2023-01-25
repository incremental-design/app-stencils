import mime from 'mime'

/**
 * Represents any image, web font, video, or other document with a mime type that can be displayed on a web page.
 *
 * Each asset is placed in the `assets` folder
 *
 * Note that a squarespace asset CANNOT exceed 10mb in size as of January 2023
 *
 * {@link https://developers.squarespace.com/template-overview}
 */
export interface SquarespaceAsset {
  src: string,
  alt: string,
  mimeType?: string // todo: use mimetype to infer type, then convert it to SquarespaceTemplateConfig.systemCollections type??
  // todo: allow assets to be stored in buckets, and shimmed in
}

// todo: handle imageLoader https://developers.squarespace.com/image-loader - ie use image loader to pull images, or use custom code to pull images
