import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

export const authGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();

  console.log('authGuard',isLoggedIn);

  if (!isLoggedIn) {
    // Redirect to the login page
    router.navigate(['/login']);
    return false;
  }

  return true;
};
