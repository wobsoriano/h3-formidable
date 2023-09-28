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
  plugins?: formidable.PluginFunction[]
  getForm?: (incomingForm: IncomingForm) => void
}

export async function readFiles(event: H3Event, options?: ReadFilesOptions): Promise<{
  fields: Fields
  files: Files
  form: IncomingForm
}> {
  const form = formidable(options)

  options?.getForm?.(form)

  options?.plugins?.forEach(form.use)

  const [fields, files] = await form.parse(event.node.req)

  return {
    fields,
    files,
    form,
  }
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
