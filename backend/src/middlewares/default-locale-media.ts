/**
 * Fills media left empty in a non-default locale with the default locale's media.
 * Components and dynamic zone entries are matched by position.
 */

import type { Core, UID } from "@strapi/strapi";

type Schema = { attributes: Record<string, any> };

export default (config: { uid: UID.ContentType }, { strapi }: { strapi: Core.Strapi }) => {
  const fill = (schema: Schema, target: any, source: any) => {
    if (!target || !source) return;

    for (const [key, attr] of Object.entries(schema.attributes)) {
      if (attr.type === "media") {
        if (target[key] == null && source[key] != null) target[key] = source[key];
      } else if (attr.type === "component") {
        const component = strapi.components[attr.component];
        if (attr.repeatable) {
          target[key]?.forEach((item, i) => fill(component, item, source[key]?.[i]));
        } else {
          fill(component, target[key], source[key]);
        }
      } else if (attr.type === "dynamiczone") {
        target[key]?.forEach((item, i) => {
          const sourceItem = source[key]?.[i];
          if (item.__component === sourceItem?.__component) {
            fill(strapi.components[item.__component], item, sourceItem);
          }
        });
      }
    }
  };

  return async (ctx, next) => {
    await next();

    const data = ctx.body?.data;
    const defaultLocale = await strapi.plugin("i18n").service("locales").getDefaultLocale();
    if (!data || !ctx.query.locale || ctx.query.locale === defaultLocale) return;

    const model = strapi.getModel(config.uid);
    const fallback = await strapi.documents(config.uid).findFirst({
      locale: defaultLocale,
      status: "published",
      populate: ctx.query.populate,
    });
    const sanitized = await strapi.contentAPI.sanitize.output(fallback, model, {
      auth: ctx.state.auth,
    });

    fill(model, data, sanitized);
  };
};
