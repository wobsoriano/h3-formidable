import type { H3Event } from 'h3'
import { eventHandler } from 'h3'
import formidable from 'formidable'
import type { Fields, Files, Options } from 'formidable'
import type IncomingForm from 'formidable/Formidable'

export interface FieldsAndFiles {
  fields: Fields
  files: Files
  form: IncomingForm
}

type ReadFilesReturn<T> = Promise<
  T extends undefined ? Files : T extends true ? FieldsAndFiles : Fields
>

interface ReadFilesOptions<T> extends Options {
  includeFields?: T
  getForm?: (incomingForm: IncomingForm) => void
}

export function readFiles<T extends boolean | undefined = undefined>(event: H3Event, options?: ReadFilesOptions<T>): ReadFilesReturn<T> {
  return new Promise<any>((resolve, reject) => {
    const form = formidable(options)

    options?.getForm?.(form)

    form.parse(event.node.req, (err, fields, files) => {
      if (err)
        reject(err)

      if (options?.includeFields) {
        resolve({
          form,
          fields,
          files,
        })
        return
      }

      resolve(files)
    })
  })
}

export function createFileParserMiddleware<T extends boolean>(options?: ReadFilesOptions<T>) {
  return eventHandler(async (event) => {
    const files = await readFiles(event, options)
    event.context.files = files
  })
}

export type {
  Fields,
  Files,
}

declare module 'h3' {
  interface H3EventContext {
    files: FieldsAndFiles | Fields
  }
}
