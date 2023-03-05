import { verifyJWT } from '~~/server/utilities/jsonwebtoken'
import handleError from '~~/server/utilities/handleError'

const JWT_SECRET: string = process.env.JWT_SECRET || ''

export default defineEventHandler(async (event) => {
  const url = event.node.req.url

  const isClientSide = !url?.startsWith('/api')

  if (isClientSide) {
    event.context.auth = {
      authenticated: false,
      user: null
    }

    return
  }

  const allowURL = [
    '/api/auth/signin',
    '/api/auth/signup'
  ]

  for (let i = 0; i < allowURL.length; i++) {
    if (url?.startsWith(allowURL[i])) {
      event.context.auth = {
        authenticated: false,
        user: null
      }

      return
    }
  }

  const auth = await getCookie(event, 'auth0') || await getHeader(event, 'authorization')

  if (!auth) {
    await deleteCookie(event, 'auth0')

    return handleError({
      statusCode: 401,
      statusMessage: 'Please login.'
    }, event)
  }

  try {
    const token = auth.replace(/(Bearer)\s/g, '')
    const user = await verifyJWT(token, JWT_SECRET)

    event.context.auth = {
      authenticated: true,
      user
    }
  } catch (err) {
    deleteCookie(event, 'auth0')

    return handleError({
      statusCode: 401,
      statusMessage: 'Your session has expired. Please log in again.'
    }, event)
  }
})
