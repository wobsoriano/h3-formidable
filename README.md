# h3-formidable

[![npm (tag)](https://img.shields.io/npm/v/h3-formidable?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/h3-formidable) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/h3-formidable?style=flat&colorA=000000&colorB=000000) ![NPM](https://img.shields.io/npm/l/h3-formidable?style=flat&colorA=000000&colorB=000000)

File upload parsing utility for h3 and Nuxt using [formidable](https://github.com/node-formidable/formidable).

## Install

```bash
npm install h3-formidable
```

## Usage

```ts
import { readFiles } from 'h3-formidable'

export default defineEventHandler(async (event) => {
  // Parse a file upload
  const files = await readFiles(event, {
    // formidable options
  })
})
```

## License

MIT
