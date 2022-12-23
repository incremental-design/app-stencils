import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
  RouterScrollBehavior,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("./pages/*.vue");

const routes = Object.keys(pages).map((path) => {
  const matches = path.match(/\.\/pages(.*)\.vue$/);
  if (!matches)
    throw new Error("there are no pages in your /src/pages directory");
  const name = matches[1].toLowerCase();
  return {
    path: name === "/pagehome" ? "/" : name,
    component: pages[path], // () => import('./pages/*.vue')
  };
});

const getScrollBehavior = (
  isWeb: boolean
): Record<string, never> | { scrollBehavior: RouterScrollBehavior } => {
  if (!isWeb) return {};
  return {
    /* see: https://router.vuejs.org/guide/advanced/scroll-behavior.html */
    scrollBehavior(
      to: RouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      savedPosition: {
        behavior?: ScrollBehavior;
        top: number;
        left: number;
      } | null
    ) {
      if (savedPosition) return savedPosition;
      if (to.hash)
        return {
          el: to.hash,
          behavior: "smooth",
        };
    },
  };
};

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR
      ? createMemoryHistory("/")
      : createWebHistory("/"),
    routes,
    ...getScrollBehavior(!import.meta.env.SSR),
  });
}
