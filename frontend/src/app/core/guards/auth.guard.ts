import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  return authService.checkAuth().pipe(
    take(1),
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true;
      }
      return router.createUrlTree(['/']);
    })
  );
};
