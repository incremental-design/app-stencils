import { SquarespaceAsset } from './Assets/Assets';
export * from './Assets/Assets'

import { SquarespaceBlock } from './Blocks/Blocks';
export * from './Blocks/Blocks'

import { SquarespaceCollection, SquarespaceFolderConfig, SquarespaceIndex } from './Collections/Collections';
export * from './Collections/Collections'

import { SquarespacePage } from './Pages/Pages';
export * from './Pages/Pages'

import { SquarespaceScript } from './Scripts/Scripts'
export * from './Scripts/Scripts'

import { SquarespaceStyle } from './Styles/Styles';
export * from './Styles/Styles'

import { SquarespaceRegion } from './Regions/Regions';
export * from './Regions/Regions'

import { SquarespaceTemplateConfig } from './Template/Template';
export * from './Template/Template'

/**
 * A configuration file that describes an entire squarespace template
 *
 * @param assets - an array of {@link SquarespaceAsset}s
 *
 * @param blocks - an array of {@link SquarespaceBlock}s
 *
 * @param collections - an array of {@link SquarespaceCollection}s
 *
 * @param pages - an array of {@link SquarespacePage}s
 *
 * @param scripts - an array of {@link SquarespaceScript}s
 *
 * @param styles - an array of {@link SquarespaceStyle}s
 *
 * @param regions - an array of {@link SquarespaceRegion}s
 *
 * @param templateConfig - the {@link SquarespaceTemplateConfig | configuration} for the entire template
 *
 * @param collectionFolders - an array of {@link SquarespaceFolderConfig}s
 *
 * @param collectionIndices - an array of {@link SquarespaceIndex}es
 *
 *
 * @param git - whether to initialize git in the template root directory. Can be false or an object that contains `lfs`
 *
 * @param lfs - an array of files and globs to track with git large file storage
 *
 */
export interface SquarespaceTemplateGeneratorOptions {
  assets: Array<SquarespaceAsset>,
  blocks: Array<SquarespaceBlock>,
  collections: Array<SquarespaceCollection>,
  pages: Array<SquarespacePage>,
  scripts: Array<SquarespaceScript>,
  styles: Array<SquarespaceStyle>,
  regions: Array<SquarespaceRegion>,
  templateConfig: SquarespaceTemplateConfig,
  collectionFolders: Array<SquarespaceFolderConfig>,
  collectionIndices: Array<SquarespaceIndex>,
  git: {
    lfs: Array<string>,
  } | false
}



