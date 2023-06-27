/**
 * Templates that wrap around the {@link SquarespacePage | pages } of a website, and contain its header, footers, and sidebars. Every squarespace template must have a minimum of ONE region.
 *
 * @param src - the relative path to the region file. Note that all region files MUST live in the root of the template!
 *
 * @param template - a {@link https://developers.squarespace.com/what-is-json-t JSON-T } that describes the appearance of the region.
 *
 * You can name your region files whatever you want. However, if you have just a single region file, it is convention to name it `site.region`. If you have multiple region files, it is convention to name them after the region they correspond to i.e. `header.region`, `footer.region`, `sidebar.region`, `full-width.region`
 *
 * @example
 * ```html
 * <!-- site.region -->
 * <!doctype html>
 *  <html>
 *
 *    <head>
 *      <title>{website.siteTitle}</title>
 *    </head>
 *
 *    <body class="{squarespace.page-classes}" id="{squarespace.page-id}">
 *
 *      <header id="header">
 *        <h1>{website.siteTitle}</h1>
 *        <squarespace:navigation navigationId="mainNav" template="navigation" />
 *      </header>
 *
 *      <main id="canvas">
 *        <section id="page" role="main" data-content-field="main-content">
 *          {squarespace.main-content}
 *        </section>
 *        <aside id="sidebar">
 *          <squarespace:block-field id="sidebarBlocks" label="Sidebar Content"
 *        </aside>
 *      </main>
 *
 *      <footer id="footer">
 *        <squarespace:block-field id="footer-blocks" columns="12" label="Footer Content"/>
 *      </footer>
 *
 *    </body>
 *
 *  </html>
 *
 * ```
 *
 * You can mix and match multiple region files. Squarespace will concatenate them into a single region file, before assigning them to a {@link SquarespaceTemplateLayout | layout}.
 * @example
 * ```html
 *
 * <!-- header.region -->
 * <!doctype html>
 *  <html>
 *
 *    <head>
 *      <title>{website.siteTitle}</title>
 *    </head>
 *
 *    <body class="{squarespace.page-classes}" id="{squarespace.page-id}">
 *
 *      <header id="header">
 *        <h1>{website.siteTitle}</h1>
 *        <squarespace:navigation navigationId="mainNav" template="navigation" />
 *      </header>
 *
 *
 * <!-- body.region -->
 *      <main id="canvas">
 *        <section id="page" role="main" data-content-field="main-content">
 *          {squarespace.main-content}
 *        </section>
 *        <aside id="sidebar">
 *          <squarespace:block-field id="sidebarBlocks" label="Sidebar Content"
 *        </aside>
 *      </main>
 *
 *
 * <!-- footer.region -->
 *      <footer id="footer">
 *        <squarespace:block-field id="footer-blocks" columns="12" label="Footer Content"/>
 *      </footer>
 *
 *    </body>
 *
 *  </html>
 *
 * ```
 * Keep in mind that when you combine multiple regions into a layout, order matters! If, for example, you concatenated `footer.region` with `header.region`, and then with `body.region`, the resulting region file won't be valid HTML.
 *
 * {@link https://developers.squarespace.com/layouts-regions/}
 */
export interface SquarespaceRegion {
  src: string, // todo: validate with zod, error if the src is nested
  template: string,
}
