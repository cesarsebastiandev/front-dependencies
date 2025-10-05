import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../ui/material-module';

@Component({
  selector: 'app-dialog-example',
  imports: [MaterialModule, MatDialogActions, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-example.html',
  styleUrl: './dialog-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExample {
  constructor(
    private dialog: MatDialogRef<DialogExample>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string }
  ) {}
  onConfirm(): void {
    console.log('Yes');
    this.dialog.close(true);
  }

  onCancel(): void {
    console.log('No');
    this.dialog.close(false);
  }
}
