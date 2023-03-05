import prisma from '~~/server/utilities/prisma'
import handleError from '~~/server/utilities/handleError'

export default defineEventHandler(async (event) => {
  try {
    const result = await prisma.teams_member.findMany({
      where: {
        userId: event.context.auth.user.id
      },
      select: {
        id: true,
        teamId: true,
        userId: true,
        teams: {
          select: {
            id: true,
            name: true,
            createdAt: true
          }
        }
      }
    })

    return {
      statusMessage: 'OK',
      statusCode: 200,
      result
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
