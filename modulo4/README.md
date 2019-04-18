# start dev

adonis serve --dev

# listen mail queue

adonis kue:listen

# docker

## postgres

docker run --name postgress -p 5432:5432 -d kartoza/postgis

`.env`

```sh
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=docker
DB_PASSWORD=docker
DB_DATABASE=adonis
```

`config/database.js`

```js
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    },
    debug: Env.get('DB_DEBUG', false)
  }
```

## redis

docker run --name redis -p 6379:6379 -d redis:alpine

`config/redis.js`

```js
  host: '127.0.0.1',
  port: 6379,
  password: null,
  db: 0,
  keyPrefix: ''
```
