import Joi from 'joi'
// import { Configuration, OpenAIApi } from 'openai'

// import usageHandler from '~~/server/store/usageHandler'

import handleError from '~~/server/utilities/handleError'

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// })

// const openai = new OpenAIApi(configuration)

const schema = Joi.object({
  prompt: Joi.string().required().max(255).messages({
    'string.empty': 'The "prompt" cannot be an empty field.',
    'string.max': 'The "prompt" length must be less than or equal to 255 characters long',
    'any.required': 'The "prompt" is a required field'
  })
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const params = await schema.validateAsync(body)

    console.log(params)

    return {
      statusMessage: 'OK',
      statusCode: 200
    }
  } catch (err: any) {
    const statusCode = err.name === 'ValidationError' ? 400 : 500
    const statusMessage = err.name === 'ValidationError' ? err.message : 'Error! Please try again later.'

    handleError({
      statusCode,
      statusMessage
    }, event)
  }
})
