import { NextResponse } from 'next/server'
import service from '@/service'
import { optionalAuthRouter } from '@/server/next/router'
import { MediaListOptions } from '@/service/model/media'
import { addLovesToMedia } from '@/service/model/media/helpers'
import { MediaWithLoves } from '@/service/types'

export type GetQuery = Partial<
  Record<keyof MediaListOptions, string> & Pick<MediaListOptions, 'status'>
>
export type GetData = {
  mediaList: MediaWithLoves[]
}
export const GET = optionalAuthRouter(async (req, ctx) => {
  console.error('VERCEL_URL: ', process.env.VERCEL_URL)
  console.error('NEXT_PUBLIC_VERCEL_URL: ', process.env.NEXT_PUBLIC_VERCEL_URL)

  const mediaList = await service.media.getLatestMediaList(
    ctx.user,
    ctx.query<GetQuery>()
  )

  return NextResponse.json<GetData>({
    mediaList: await addLovesToMedia(mediaList, ctx.user?.id),
  })
})
