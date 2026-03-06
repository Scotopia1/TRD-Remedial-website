import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint.
 *
 * The admin dashboard POSTs here after content changes so the public site
 * regenerates affected pages immediately instead of waiting for the ISR timer.
 *
 * Body: { secret: string; type: string; slug?: string }
 */
export async function POST(request: Request) {
  try {
    const { secret, type, slug } = await request.json();

    // Authenticate with shared secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 },
      );
    }

    // Map content types to the paths they affect
    const pathMap: Record<string, string[]> = {
      service: ['/services', slug ? `/services/${slug}` : '', '/'],
      project: ['/projects', slug ? `/projects/${slug}` : '', '/'],
      settings: ['/'],       // Layout-level — affects everything
      team: ['/about', '/'],
      values: ['/about'],
      faqs: ['/', '/services'],
      testimonials: ['/', '/projects'],
      content: ['/'],        // Page content can affect any page
    };

    const paths = (pathMap[type] || ['/']).filter(Boolean);

    for (const path of paths) {
      revalidatePath(path, 'layout');
    }

    return NextResponse.json(
      { revalidated: true, paths },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      },
    );
  } catch (err) {
    console.error('[revalidate] Error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 },
    );
  }
}
