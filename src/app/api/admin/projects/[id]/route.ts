// Projects API - Get, Update, Delete individual project
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { projectUpdateSchema } from '@/lib/validations'
import { successResponse, errorResponse, handleApiError } from '@/lib/api-utils'

type RouteContext = {
  params: Promise<{ id: string }>
}

// GET /api/admin/projects/[id] - Get single project
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        service: true,
        teamMembers: true,
        relatedProjects: {
          select: {
            id: true,
            name: true,
            slug: true,
            featuredImage: true,
          }
        }
      }
    })

    if (!project) {
      return errorResponse('Project not found', 404)
    }

    return successResponse(project)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/admin/projects/[id] - Update project
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const validatedData = projectUpdateSchema.parse(body)

    // Convert date string to Date object if provided
    const updateData = {
      ...validatedData,
      ...(validatedData.date && { date: new Date(validatedData.date) }),
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        service: true,
        teamMembers: true,
      }
    })

    return successResponse(project)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params

    await prisma.project.delete({
      where: { id }
    })

    return successResponse({ message: 'Project deleted successfully' })
  } catch (error) {
    return handleApiError(error)
  }
}
