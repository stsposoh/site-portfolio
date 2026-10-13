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
    "backButtonLabel",
  ],
  menu: {
    populate: {
      navItems: {
        fields: ["label"],
      },
    },
  },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query.populate = populate;
    strapi.log.info("In global-populate middleware.");

    await next();
  };
};
