/**
 * `landing-page-populate` middleware
 */

import type { Core } from "@strapi/strapi";

const heading = { populate: { image: true } };

const populate = {
  certificatesHeading: heading,
  portfolioHeading: heading,
  contactsHeading: heading,
  blocks: {
    on: {
      "blocks.about": {
        fields: [
          "shortText",
          "stackText",
          "content",
          "experienceLabel",
          "sitesCount",
          "sitesLabel",
          "certificatesLabel",
        ],
        populate: {
          heading: { populate: { image: true } },
          stackItems: true,
          infoCards: {
            populate: {
              image: true,
              link: true,
              description: true,
            },
            fields: ["years"],
          },
        },
      },
      "blocks.skills": {
        populate: {
          heading: { populate: { image: true } },
          skills: {
            populate: {
              skills: {
                populate: { icon: true },
              },
            },
          },
        },
      },
    },
  },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      ...ctx.query,
      populate: {
        ...populate,
        ...(ctx.query.populate || {}),
      },
    };

    await next();
  };
};
