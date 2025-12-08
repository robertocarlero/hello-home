import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '@features/auth/services/auth.service';
import { toast } from 'ngx-sonner';

/**
 * List of protected routes that require authentication.
 * If a 401 occurs while on these routes, user will be redirected to home.
 */
const PROTECTED_ROUTES = ['/checkout', '/profile'];

/**
 * Interceptor that handles 401 Unauthorized responses.
 * When a 401 is detected, it automatically logs out the user and redirects to home
 * only if they are on a protected route.
 */
export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Clear user session
        authService.clearSession();

        if (!req.url.includes('/auth/me') && !req.url.includes('/auth/logout')) {
          toast.error('Your session has expired. Please log in again.');
        }

        // Only redirect if user is on a protected route
        const isOnProtectedRoute = PROTECTED_ROUTES.some((route) => router.url.startsWith(route));

        if (isOnProtectedRoute) {
          router.navigate(['/'], {
            queryParams: { openLogin: 'true' },
          });
        }
      }

      return throwError(() => error);
    })
  );
};
