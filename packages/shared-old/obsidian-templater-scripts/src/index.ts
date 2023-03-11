import generateApiDocumentation from './lib/generateApiDocumentation'

/**
 *
 * @returns an object that contains all of the different scripts that can be run
 *
 *
 * @remarks
 *
 * Obsidian templater {@link https://silentvoid13.github.io/Templater/user-functions/script-user-functions.html expects } to receive a commonjs module that exports a single function.
 *
 */
function returnTemplaterScripts(): Record<string, Function>{
  return {generateApiDocumentation}
}

export default returnTemplaterScripts
