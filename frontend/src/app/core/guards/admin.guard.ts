import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Helper function to check role
  const checkRole = (user: any) => {
    return user && user.role === 'admin';
  };

  if (authService.isAuthenticated()) {
    if (checkRole(authService.currentUser())) {
      return true;
    }
    return router.createUrlTree(['/']);
  }

  return authService.checkAuth().pipe(
    take(1),
    map((isAuthenticated: boolean) => {
      if (isAuthenticated && checkRole(authService.currentUser())) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
};
