import type { H3Event } from 'h3'
import { eventHandler } from 'h3'
import formidable from 'formidable'
import type { Fields, Files } from 'formidable'

export interface FieldsAndFiles {
  fields: Fields
  files: Files
}

export function readFiles<
  T extends boolean | undefined = undefined,
>(event: H3Event, options?: formidable.Options & { includeFields?: T }): Promise<
  T extends undefined ? Files : T extends true ? FieldsAndFiles : Fields
> {
  return new Promise<any>((resolve, reject) => {
    const form = formidable(options)

    form.parse(event.node.req, (err, fields, files) => {
      if (err)
        reject(err)

      if (options?.includeFields) {
        resolve({
          fields,
          files,
        })
        return
      }

      resolve(files)
    })
  })
}

export function createFileParserMiddleware<T extends boolean>(options?: formidable.Options & { includeFields?: T }) {
  return eventHandler(async (event) => {
    const files = await readFiles(event, options)
    event.context.files = files
  })
}

export type {
  Fields,
  Files,
}
