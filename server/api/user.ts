import prisma from '~~/server/utilities/prisma'
import handleError from '~~/server/utilities/handleError'
import getKey from '~~/server/utilities/getKey'

export default defineEventHandler(async (event) => {
  try {
    const user = await prisma.users.findFirstOrThrow({
      where: {
        id: event.context.auth.user.id
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    })

    return user
  } catch (err: any) {
    const statusCode = getKey(err.name, {
      NotFoundError: 400,
      default: 500
    })

    const statusMessage = getKey(err.message, {
      'No users found': 'Sorry no user found.',
      default: 'InternalError'
    })

    handleError({
      statusCode,
      statusMessage
    }, event)
  }
})
