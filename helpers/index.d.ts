import type { Fields } from 'formidable'
import type { IncomingForm } from 'formidable'

export function firstValues(form: IncomingForm, fields: Fields, exceptions: string[]): Fields
export function readBooleans(fields: Fields, expectedBooleans: string[]): Fields
