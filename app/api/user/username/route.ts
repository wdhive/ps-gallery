import { checkPassword, sendUserAndToken } from '/server/next/middlewares/auth'
import { authRouter } from '/server/next/router'
import service from '/service'
import ReqErr from '/service/ReqError'

export const PATCH = authRouter(
  checkPassword,
  async (_, ctx, next) => {
    const { newUsername } = ctx.data
    if (!newUsername) throw new ReqErr('New username is required')
    ctx.user = await service.user.changeUsername(ctx.user.id, newUsername)
    return next()
  },
  sendUserAndToken
)
