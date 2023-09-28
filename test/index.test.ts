import path from 'node:path'
import fs from 'node:fs'
import type { SuperTest, Test } from 'supertest'
import supertest from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'
import type { App } from 'h3'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { createFileParserMiddleware, readFiles } from '../src'

function getFileContent(path: string) {
  return fs.readFileSync(path).toString().trim()
}

describe('parse multipart/form-data', () => {
  let app: App
  let request: SuperTest<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(toNodeListener(app))
  })

  test('readFiles()', async () => {
    app.use('/upload', eventHandler(async (event) => {
      const { fields, files } = await readFiles(event)
      return { fields, files }
    }))

    const pathToFile = path.join(__dirname, '/hello.txt')
    const res = await request.post('/upload').attach('text', pathToFile).field('name', 'John Doe')

    expect(getFileContent(res.body.files.text[0].filepath)).toBe('Hello world')
    expect(res.body.fields.name[0]).toBe('John Doe')
  })

  test('createFileParserMiddleware()', async () => {
    app
      .use(createFileParserMiddleware())
      .use('/upload', eventHandler((event) => {
        return { files: event.context.formidable.files }
      }))

    const pathToFile = path.join(__dirname, '/hello.txt')
    const res = await request.post('/upload').attach('text', pathToFile)

    expect(getFileContent(res.body.files.text[0].filepath)).toBe('Hello world')
  })
})
