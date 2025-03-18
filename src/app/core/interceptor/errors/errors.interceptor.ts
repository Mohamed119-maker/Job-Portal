import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // تجاهل الأخطاء الصادرة من عملية البحث
      if (req.url.includes('api/Job/search')) {
        console.warn('Search error ignored:', err.error.message);
        return throwError(() => err);
      }

      // إظهار الخطأ في باقي الحالات
      console.log(err.error.message);
      toastrService.error(err.error.message, 'Job Portal');

      return throwError(() => err);
    })
  );
};
