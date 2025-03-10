import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';


export const authGuard: CanActivateFn = (route, state) => {
  
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    //  const userRole = authService.getCurrentUserData().role;
    
    if (authService.getCurrentUserData().token) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
};
