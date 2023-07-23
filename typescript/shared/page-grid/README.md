To import this CSS into vue 3 SFC with vite:

```vue
import classes from '@incremental.design/shared-page-grid/PageGrid.module.css'
```

see: https://vitejs.dev/guide/features.html#css-modules

you HAVE to specify `/PageGrid.module.css` because vite uses the `.module.css` suffix to load as a CSS module

if your vite config has `css.modules.localsConvention` set to `camelCaseOnly` you can also destructure the class names:

```vue
import { pageGrid } from
'@incremental.design/shared-page-grid/PageGrid.module.css'
```

see: https://vitejs.dev/guide/features.html#css-modules

note that you won't get go-to-definition or intellisense for css modules as of July 2023, but they will work correctly.

<!-- todo: how to build for different targets, and import as follows?
https://web.dev/css-module-scripts/
 -->
