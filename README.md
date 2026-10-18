# Portfolio

Сайт-портфолио [posokhov.com](https://posokhov.com).

- `frontend/` — Nuxt 3, собирается в статику
- `backend/` — Strapi 5 (SQLite), работает только локально и нужен лишь во время сборки

Языки: украинский на `/`, английский на `/en`, русский на `/ru`.

## Локальная разработка

```bash
cd backend && npm install && npm run develop   # админка: http://localhost:1337/admin
cd frontend && npm install && npm run dev      # сайт: http://localhost:3000
```

## Сборка статики

Strapi должен быть запущен: при сборке из него берутся контент и картинки.

```bash
cd frontend
npm run generate
```

Результат лежит в `frontend/.output/public`. Скрипт копирует туда из `backend/public/uploads` только используемые картинки, поэтому на хостинге Strapi не нужен.

Проверить сборку локально:

```bash
npx serve .output/public
```

## Публикация на Cloudflare Pages

Проект `posokhov` создан в режиме Direct Upload: Cloudflare ничего не собирает сам, сборка загружается с компьютера. Пуш в GitHub сайт не обновляет.

```bash
cd frontend
npm run generate
npx wrangler pages deploy .output/public --project-name posokhov
```

Если wrangler просит авторизацию, выполни `npx wrangler login`.

Домен `posokhov.com` подключён в Cloudflare: Compute → Workers & Pages → posokhov → Custom domains.

## Как обновить контент

1. Внести правки в админке Strapi и опубликовать их в каждой локали.
2. Собрать статику и загрузить её (см. выше).
3. Закоммитить `backend/database/data.db` и `backend/public/uploads`, остановив перед этим Strapi: в git это единственная копия контента.
