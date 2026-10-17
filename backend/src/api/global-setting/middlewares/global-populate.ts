/**
 * `global-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const populate = {
  fields: [
    "title",
    "description",
    "headerTitle",
    "headerPosition",
  ],
  menu: {
    populate: {
      navItems: {
        fields: ["label", "slug"],
      },
    },
  },
  ui: true,
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info("In global-populate middleware.");

    await next();
  };
};
