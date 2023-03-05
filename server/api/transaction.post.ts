import Joi from 'joi'

import usageHandler from '~~/server/store/usageHandler'

import handleError from '~~/server/utilities/handleError'

const schema = Joi.object({
  teamId: Joi.number().integer().required(),
  amount: Joi.number().integer().required(),
  type: Joi.string().valid('increment', 'decrement', 'decrements').required()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const params = await schema.validateAsync(body)

    await usageHandler({
      userId: event.context.auth.user.id,
      ...params
    }, event)

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
