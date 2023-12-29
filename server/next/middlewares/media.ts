import service from '@/service'
import ReqErr from '@/service/ReqError'
import { addLovesToMediaList } from '@/service/model/media/helpers'
import { MediaWithLoves, NextUserMediaHandler } from '@/service/types'
import { NextResponse } from 'next/server'

export const setMedia: NextUserMediaHandler = async (_, ctx, next) => {
  const mediaId = ctx.params.mediaId
  if (!mediaId) throw new ReqErr('Media id is required')
  ctx.media = await service.media.getMedia(mediaId, ctx.user)
  return next()
}

export type SendMediaWithLovesData = { media: MediaWithLoves }
export const sendMediaWithLoves: NextUserMediaHandler = async (_, ctx) => {
  const [media] = await addLovesToMediaList(ctx.user?.id, ctx.media)
  return NextResponse.json<SendMediaWithLovesData>({ media })
}
