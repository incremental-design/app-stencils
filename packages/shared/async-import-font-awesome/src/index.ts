import type {
  IconPrefix,
  IconName,
  IconDefinition,
} from "@fortawesome/fontawesome-svg-core";

/**
 * async import an icon from font awesome pro 6
 *
 * @param name - one of {@link IconName}
 *
 * @param prefix - one of {@link IconPrefix}. If you don't supply this, every weight and style of the icon will be imported
 *
 * @returns an object that contains a key of {@link IconPrefix} and a value of {@link IconDefinition}
 */
const importIcon = async (name: IconName, prefix?: IconPrefix) => {
  const camelizedName = `fa${name
    .split("-")
    .map((sub) => sub.slice(0, 1).toUpperCase + sub.slice(1))
    .join("")}`;

  const getPackage = () => {
    const p = {
      fad /* font-awesome-duotone */: "pro-duotone-svg-icons",
      fass /* font-awesome-solid-sharp*/: "pro-solid-svg-icons",
      fas /* font-awesome-solid */: "pro-solid-svg-icons",
      far /* font-awesome-regular */: "pro-regular-svg-icons",
      fal /* font-awesome-light */: "pro-light-svg-icons",
      fat /* font-awesome-thin */: "pro-thin-svg-icons",
      fab /* font-awesome-brands */: "free-brand-svg-icons",
    };

    if (!prefix) return p;
    return Object.fromEntries(
      Object.entries(p).filter((entry) => entry[0] === prefix)
    );
  };

  const p = getPackage();

  const entries = await Promise.all(
    Object.keys(p).map(async (k) => {
      const i = (await import(
        `@fortawesome/${k}/${camelizedName}`
      )) as unknown as IconDefinition;
      return { [k]: i };
    })
  );

  return entries.reduce((acc, curr) => Object.assign(acc, curr));
};

export default importIcon;
