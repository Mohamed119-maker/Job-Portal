import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const pLATFORM_ID = inject(PLATFORM_ID);
  if (isPlatformBrowser(pLATFORM_ID)) {
    const token = localStorage.getItem('token');

    const userRole = localStorage.getItem('role'); // تأكد من أن الدور معرف

    if (token && userRole === 'admin' || userRole === 'Admin') {
      return true;
    } else {
      router.navigate(['/job-list']);
      return false;
    }
  }
  else {
    return false;
  }
};
