import type { H3Event } from 'h3'
import formidable from 'formidable'

export function readFiles(event: H3Event, options?: formidable.Options): Promise<formidable.Files> {
  return new Promise((resolve, reject) => {
    const form = formidable(options)

    form.parse(event.req, (err, _fields, files) => {
      if (err)
        reject(err)

      resolve(files)
    })
  })
}
