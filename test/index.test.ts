import path from 'path'
import fs from 'fs'
import type { SuperTest, Test } from 'supertest'
import supertest from 'supertest'
import { beforeEach, describe, expect, test } from 'vitest'
import type { App } from 'h3'
import { createApp, eventHandler, toNodeListener } from 'h3'
import { readFiles } from '../src'

function getFileContent(path: string) {
  return fs.readFileSync(path).toString()
}

describe('useValidatedBody', () => {
  let app: App
  let request: SuperTest<Test>

  beforeEach(() => {
    app = createApp({ debug: false })
    request = supertest(toNodeListener(app))
  })

  test('parses multipart/form-data', async () => {
    app.use('/upload', eventHandler(async (event) => {
      const files = await readFiles(event)
      return { files }
    }))

    const pathToFile = path.join(__dirname, '/hello.txt')
    const res = await request.post('/upload')
      .attach('text', pathToFile)

    expect(res.status).toEqual(200)
    expect(getFileContent(res.body.files.text[0].filepath)).toBe(getFileContent(pathToFile))
  })
})
