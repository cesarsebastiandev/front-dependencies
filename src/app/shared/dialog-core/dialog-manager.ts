import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom, Observable } from 'rxjs';
import { DialogExample } from './dialog-example/dialog-example';

@Injectable({
  providedIn: 'root',
})
export class DialogManager {
  constructor(private dialog: MatDialog) {}
  async openConfirmDialog(
    title: string,
    content: string,
    enterAnimationDuration: string = '100ms',
    exitAnimationDuration: string = '100ms'
  ): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogExample, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title, content },
    });

    return await firstValueFrom(dialogRef.afterClosed());
  }
}
