import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  BusyRequestCount = 0;

  private spinnerService = inject(NgxSpinnerService)

  constructor() { }

  busy() {
    this.BusyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-pulse-sync',
      bdColor: 'rgba(0,0,0,0.8)',
      color: '#fff', // Color corregido
      size: 'default'
    });
  }
  idle(){
    this.BusyRequestCount--;
    if(this.BusyRequestCount <= 0){
      this.BusyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
