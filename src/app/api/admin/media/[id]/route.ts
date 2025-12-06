// Media Library API - Get, Update, Delete individual media file
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mediaUpdateSchema } from '@/lib/validations'
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils'

type RouteContext = {
  params: Promise<{ id: string }>
}

// GET /api/admin/media/[id] - Get single media file
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    const media = await prisma.media.findUnique({
      where: { id }
    })

    if (!media) {
      return errorResponse('Media file not found', 404)
    }

    return successResponse(media)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/admin/media/[id] - Update media file metadata
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const validatedData = mediaUpdateSchema.parse(body)

    const media = await prisma.media.update({
      where: { id },
      data: validatedData
    })

    return successResponse(media)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/admin/media/[id] - Delete media file
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    // TODO: In Phase 4, also delete the actual file from Vercel Blob Storage
    await prisma.media.delete({
      where: { id }
    })

    return successResponse({
      message: 'Media file deleted successfully',
      note: 'Physical file deletion will be implemented in Phase 4'
    })
  } catch (error) {
    return handleApiError(error)
  }
}
