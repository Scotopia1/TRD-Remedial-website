// Projects API - List and Create
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validations'
import { successResponse, handleApiError } from '@/lib/api-utils'

// GET /api/admin/projects - List all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')

    const projects = await prisma.project.findMany({
      where: serviceId ? { serviceId } : undefined,
      include: {
        service: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        },
        teamMembers: {
          select: {
            id: true,
            name: true,
            title: true,
          }
        },
        _count: {
          select: {
            relatedProjects: true,
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return successResponse(projects)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = projectSchema.parse(body)

    // Convert date string to Date object if needed
    const projectData = {
      ...validatedData,
      date: new Date(validatedData.date),
    }

    const project = await prisma.project.create({
      data: projectData,
      include: {
        service: true,
        teamMembers: true,
      }
    })

    return successResponse(project, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
