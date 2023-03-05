import Joi from 'joi'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { compare } from 'bcrypt'

import prisma from '~~/server/utilities/prisma'
import { signJWT } from '~~/server/utilities/jsonwebtoken'
import handleError from '~~/server/utilities/handleError'

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'The email cannot be an empty field.',
    'string.email': 'The email must be valid.',
    'any.required': 'The email is a required field'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'The password cannot be an empty field.',
    'any.required': 'The password is a required field'
  })
})

dayjs.extend(utc)

const JWT_SECRET: string = process.env.JWT_SECRET ?? ''

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const params = await schema.validateAsync(body)

    const user = await prisma.users.findUnique({
      where: {
        email: params.email
      },
      select: {
        id: true,
        email: true,
        temp: true,
        password: true
      }
    })

    if (!user) {
      return handleError({
        statusCode: 400,
        statusMessage: 'Error invalid login or password.'
      }, event)
    }

    const isMatch = await compare(params.password, user.password)

    if (!isMatch) {
      return handleError({
        statusCode: 400,
        statusMessage: 'Error invalid login or password.'
      }, event)
    }

    const token = await signJWT({
      id: user.id,
      email: user.email
    }, JWT_SECRET, {
      expiresIn: '1hr',
      audience: 'app',
      issuer: 'app'
    })

    setCookie(event, 'auth0', token, {
      maxAge: 3600,
      path: '/'
    })

    setHeader(event, 'Access-Control-Expose-Headers', 'Authorization')
    setHeader(event, 'Authorization', `Bearer ${token}`)

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
