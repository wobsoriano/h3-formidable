# h3-formidable

[![npm (tag)](https://img.shields.io/npm/v/h3-formidable?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/h3-formidable) ![NPM](https://img.shields.io/npm/l/h3-formidable?style=flat&colorA=000000&colorB=000000)

File upload parsing utility for h3 and Nuxt using [formidable](https://github.com/node-formidable/formidable).

Demo - https://stackblitz.com/edit/nuxt-starter-ykuwmn

## Install

```bash
npm install h3-formidable
```

## Usage

This example shows Nuxt usage but you can use it with any h3 app.

1. Create a server middleware

```ts
import { createFileParserMiddleware } from 'h3-formidable'

export default createFileParserMiddleware({
  // formidable options
})
```

2. Access files in your api route

```ts
export default eventHandler(async (event) => {
  const { files } = event.context.formidable
})
```

or you can ditch server middleware and parse files per api route...

```ts
import { readFiles } from 'h3-formidable'

export default eventHandler(async (event) => {
  const { fields, files, form } = await readFiles(event, {
    // formidable options
  })
})
```

## Helpers

```ts
import { firstValues, readBooleans } from 'h3-formidable/helpers'

export default eventHandler(async (event) => {
  const { fields, files, form } = await readFiles(event)

  // Gets first values of fields
  const exceptions = ['thisshouldbeanarray']
  const fieldsSingle = firstValues(form, fields, exceptions)

  // Converts html form input type="checkbox" "on" to boolean
  const expectedBooleans = ['checkbox1', 'wantsNewsLetter', 'hasACar']
  const fieldsWithBooleans = readBooleans(fieldsSingle, expectedBooleans)
})
```

## TypeScript Shim

```ts
declare module 'h3' {
  import type { FieldsAndFiles } from 'h3-formidable'

  interface H3EventContext {
    formidable: FieldsAndFiles
  }
}
```

## License

MIT
