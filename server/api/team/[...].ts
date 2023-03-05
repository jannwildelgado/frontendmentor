import handleError from '~~/server/utilities/handleError'

export default defineEventHandler((event) => {
  try {
    console.log('POST:', event.context.params)

    return {
      statusMessage: 'OK',
      statusCode: 200
    }
  } catch (err: any) {
    const statusCode = err.name === 'ValidationError' ? 400 : 500
    const statusMessage = err.name === 'ValidationError' ? err.message : 'InternalError'

    handleError({
      statusCode,
      statusMessage
    }, event)
  }
})
