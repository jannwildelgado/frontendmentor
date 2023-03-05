import Joi from 'joi'
import { Configuration, OpenAIApi } from 'openai'

import usageHandler from '~~/server/store/usageHandler'

import handleError from '~~/server/utilities/handleError'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const schema = Joi.object({
  teamId: Joi.number().integer().required(),
  prompt: Joi.string().required()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const params = await schema.validateAsync(body)

    await usageHandler({
      userId: event.context.auth.user.id,
      teamId: params.teamId,
      amount: 1,
      type: 'decrement'
    }, event)

    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: params.prompt
    })

    return {
      statusMessage: 'OK',
      statusCode: 200,
      result: completion.data
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
