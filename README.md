# h3-formidable

[![npm (tag)](https://img.shields.io/npm/v/h3-formidable?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/h3-formidable) ![NPM](https://img.shields.io/npm/l/h3-formidable?style=flat&colorA=000000&colorB=000000)

File upload parsing utility for h3 and Nuxt using [formidable](https://github.com/node-formidable/formidable).

Demo - https://stackblitz.com/edit/nuxt-starter-ykuwmn

## Install

```bash
npm install h3-formidable
```

## Usage with Nuxt

1. Create a server middleware

```ts
import { createFileParserMiddleware } from 'h3-formidable'

export default createFileParserMiddleware({})
```

2. Access files in your api route

```ts
export default eventHandler(async (event) => {
  const { files } = event.context
})
```

or you can ditch server middleware and parse files per api route...

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

## Usage with H3

```ts
import { createFileParserMiddleware } from 'h3-formidable'

const app = createApp()
app
  .use(createFileParserMiddleware({}))
  .use(eventHandler((event) => {
    // event.context.files contains parsed files
  }))
```

## TypeScript Shim

```ts
declare module 'h3' {
  import type { FieldsAndFiles, Files } from 'h3-formidable'

  interface H3EventContext {
    files: FieldsAndFiles | Files
  }
}
```

## License

MIT
