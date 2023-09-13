import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

type AuthorizedRoute = {
  name: string,
  handle: () => NextResponse | undefined
}

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const pathname = request.nextUrl.pathname

    const authorizedRoutes: AuthorizedRoute[] = [
      AuthorizeRoute(request, '/dashboard', [], '/403', false),
      AuthorizeRoute(request, '/user', [], '/403', false)
    ]

    /* The routes below are inverted, meaning they are only redirected if the user IS logged in */
    if (request.nextauth.token?.user && (pathname.startsWith('/signup') || pathname.startsWith('/signin') || pathname.startsWith('/forgottenPassword'))) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    /* End of Inverted Routes */

    const deniedRoute = authorizedRoutes.find((route: AuthorizedRoute) => pathname.startsWith(route.name))
    if (deniedRoute) return deniedRoute.handle()
  }
)

function AuthorizeRoute(request: NextRequestWithAuth, route: string, roles: string[], newRoute: string, isRedirect: boolean): AuthorizedRoute {
  return {
    name: route,
    handle: () => {
      let isPermitted = true

      if (roles.length) isPermitted = roles.some(role => role === request.nextauth.token?.user?.role) // Check if user has one of the required roles
      else isPermitted = !!request.nextauth.token?.user // If no roles were given, the route only requires the user to be logged in

      if (!isPermitted && isRedirect) return NextResponse.redirect(new URL(newRoute, request.url))
      else if (!isPermitted) return NextResponse.rewrite(new URL(newRoute, request.url))
    }
  }
}

// export const config = {
//   matcher: ['/']
// }