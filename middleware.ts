import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/search')) {
    const q = url.searchParams.get('q')
    const type = url.searchParams.get('type')

    if (!q && !type) {
      url.pathname = '/';
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next();
}

export const config = { 
  matcher: ['/search'] 
}