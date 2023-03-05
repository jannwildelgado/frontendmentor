import prisma from '~~/server/utilities/prisma'
import handleError from '~~/server/utilities/handleError'
import getKey from '~~/server/utilities/getKey'

type Usages = {
  userId: number,
  teamId: number,
  amount: number,
  type: string
}

export default async function usageHandler (usage: Usages, event: any) {
  if (!event) {
    throw new Error('H3Event is null.')
  }

  let type: any = null
  let team: any = null

  try {
    team = await prisma.teams_member.findFirstOrThrow({
      where: {
        userId: usage.userId,
        teamId: usage.teamId
      },
      select: {
        id: true,
        userId: true,
        roleId: true,
        teamId: true,
        teams: true
      }
    })

    type = await prisma.types.findFirstOrThrow({
      where: {
        name: usage.type
      },
      select: {
        id: true,
        name: true
      }
    })
  } catch (err: any) {
    const statusCode = getKey(err.name, {
      NotFoundError: 400,
      default: 500
    })

    const statusMessage = getKey(err.message, {
      'No teams_member found': 'Sorry team not found.',
      'No teams_transaction_type found': 'Operator transaction not found.',
      default: 'InternalError'
    })

    return handleError({
      statusCode,
      statusMessage
    }, event)
  }

  let balance = team.teams.usage ?? 0

  switch (type.name) {
  case 'decrement':
    balance -= usage.amount
    break
  case 'increment':
    balance += usage.amount
    break
  }

  if (balance < 0) {
    return handleError({
      statusCode: 400,
      statusMessage: 'Sorry but you no longer have an access token.'
    }, event)
  }

  try {
    const trx = await prisma.$transaction(async (trx) => {
      const t = await trx.teams_usage.create({
        data: {
          userId: usage.userId,
          teamId: usage.teamId,
          typeId: type.id,
          amount: usage.amount,
          balance
        }
      })

      await trx.teams.update({
        where: {
          id: usage.teamId
        },
        data: {
          usage: balance
        }
      })

      return t
    })

    return trx
  } catch {
    return handleError({
      statusCode: 500,
      statusMessage: 'Internal Error! Please try again later.'
    }, event)
  }
}
