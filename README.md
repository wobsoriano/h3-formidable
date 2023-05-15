# h3-formidable

[![npm (tag)](https://img.shields.io/npm/v/h3-formidable?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/h3-formidable) ![NPM](https://img.shields.io/npm/l/h3-formidable?style=flat&colorA=000000&colorB=000000)

File upload parsing utility for h3 and Nuxt using [formidable](https://github.com/node-formidable/formidable).

## Install

```bash
npm install h3-formidable
```

## Usage

per route

```ts
import { readFiles } from 'h3-formidable'

export default eventHandler(async (event) => {
  // only files
  const files = await readFiles(event)

  // with fields
  const { fields, files } = await readFiles(event, {
    includeFields: true,
    // other formidable options here
  })
})
```

or via server middleware

`~/server/middleware/formidable.ts`

```ts
import { createFileParserMiddleware } from 'h3-formidable'

export default createFileParserMiddleware({})

const app = createApp()

app
  .use(createFileParserMiddleware({}))
  .use(eventHandler((event) => {
    // event.context.files contains parsed files
  }))
```

`~/server/api/some-route.ts`

```ts
export default eventHandler(async (event) => {
  const { files } = event.context
})
```

Typing

```ts
declare module 'h3' {
  import type { Files } from 'h3-formidable'

  interface H3EventContext {
    files: Files
  }
}
```

## License

MIT
