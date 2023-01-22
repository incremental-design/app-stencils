/**
 *
 * @param apiJsonPath - the path to the {@link https://api-extractor.com/pages/overview/demo_docs/ | doc model} file. This should end with `.api.json`
 *
 * @returns a promise to make a string of markdown
 */
declare const generateApiDocumentation: (apiJsonPath?: string) => Promise<string>;
export default generateApiDocumentation;
