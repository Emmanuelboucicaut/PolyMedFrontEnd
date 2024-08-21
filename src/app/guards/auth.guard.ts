import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

export const authGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }


  return true;
};
