import Joi from 'joi'
import { hash } from 'bcrypt'

import usageHandler from '~~/server/store/usageHandler'

import prisma from '~~/server/utilities/prisma'
import handleError from '~~/server/utilities/handleError'

const schema = Joi.object({
  firstName: Joi.string().min(2).max(100).required().trim(),
  lastName: Joi.string().min(2).max(100).required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const params = await schema.validateAsync(body)

    const isNotUnique = await prisma.users.findUnique({
      where: {
        email: params.email
      },
      select: {
        id: true,
        email: true
      }
    })

    if (isNotUnique) {
      return handleError({
        statusCode: 400,
        statusMessage: 'Looks like you this email is already taken.'
      }, event)
    }

    const password = await hash(params.password, 10)
    const temp = Buffer.from(params.password).toString('base64')

    const user = await prisma.users.create({
      data: {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password,
        temp
      },
      select: {
        id: true,
        firstName: true,
        email: true
      }
    })

    const team = await prisma.teams.create({
      data: {
        name: `${user.firstName}'s`
      },
      select: {
        id: true
      }
    })

    await prisma.teams_member.create({
      data: {
        userId: user.id,
        teamId: team.id,
        roleId: 1
      }
    })

    await usageHandler({
      userId: user.id,
      teamId: team.id,
      amount: 50000,
      type: 'increment'
    }, event)

    return {
      statusMessage: 'Registered! Please sign in.',
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
