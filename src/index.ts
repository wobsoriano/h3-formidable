import type { H3Event } from 'h3'
import { eventHandler } from 'h3'
import formidable from 'formidable'
import type { Fields, Files, Options } from 'formidable'
import type IncomingForm from 'formidable/Formidable'

export interface Result {
  fields: Fields
  files: Files
  form: IncomingForm
}

interface ReadFilesOptions extends Options {
  getForm?: (incomingForm: IncomingForm) => void
}

export function readFiles(event: H3Event, options?: ReadFilesOptions) {
  return new Promise<Result>((resolve, reject) => {
    const form = formidable(options)

    options?.getForm?.(form)

    form.parse(event.node.req, (err, fields, files) => {
      if (err)
        return reject(err)

      resolve({
        fields,
        files,
        form,
      })
    })
  })
}

export function createFileParserMiddleware(options?: ReadFilesOptions) {
  return eventHandler(async (event) => {
    const files = await readFiles(event, options)
    event.context.formidable = files
  })
}

export type {
  Fields,
  Files,
}
