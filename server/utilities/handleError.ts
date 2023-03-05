import { sendError, createError } from 'h3'

export default function handleError (err: { statusCode: number, statusMessage: string }, event: any) {
  const error = createError({
    statusCode: err.statusCode,
    statusMessage: err.statusMessage
  })

  sendError(event, error, false)
}
