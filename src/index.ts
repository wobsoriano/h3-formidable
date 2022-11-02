import type { H3Event } from 'h3'
import { eventHandler } from 'h3'
import formidable from 'formidable'
import type { Files } from 'formidable'

export function readFiles(event: H3Event, options?: formidable.Options): Promise<Files> {
  return new Promise((resolve, reject) => {
    const form = formidable(options)

    form.parse(event.req, (err, _fields, files) => {
      if (err)
        reject(err)

      resolve(files)
    })
  })
}

export function createFileParserMiddleware(options?: formidable.Options) {
  return eventHandler(async (event) => {
    const files = await readFiles(event, options)
    event.context.files = files
  })
}

export type {
  Files,
}
