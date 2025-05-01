import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy.service';
import { delay, finalize } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  busyService.busy();
  return next(req).pipe(
    // delay(2000), //--Si es necesario pero por ahora no
    finalize (() => busyService.idle()
  )
  );
};
