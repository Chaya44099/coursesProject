import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

export const teacherGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

   const userRole = authService.getCurrentUserData();
  
  if (userRole.token && userRole.role === 'teacher') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
