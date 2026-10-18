/**
 * contact router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::contact.contact', {
  config: {
    find: {
      middlewares: [
        {
          name: 'global::default-locale-media',
          config: { uid: 'api::contact.contact' },
        },
      ],
    },
  },
});
