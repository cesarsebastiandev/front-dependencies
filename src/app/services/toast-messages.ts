import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastMessages {
  constructor(private snackBar: MatSnackBar) {}

  error(msn: string): void {
    this.snackBar.open(msn, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  success(msn: string): void {
    this.snackBar.open(msn, 'Cerrar', {
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }

  /*error(msn: string): void {
    this.snackBar.open(msn, 'Cerrar', {
      panelClass: ['error-snackbar'],
    });
  }

  success(msn: string): void {
    this.snackBar.open(msn, 'Cerrar', {
      panelClass: ['success-snackbar'],
    });
  } */
}
