import { Component, effect, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../ui/material-module';
import { DependencyData } from '../core/services/dependency-data';
import { ToastMessages } from '../../../services/toast-messages';

@Component({
  selector: 'app-dependency-create',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dependency-create.html',
  styleUrl: './dependency-create.scss',
})
export class DependencyCreate {
  private dependencyService = inject(DependencyData);

  private fb = inject(FormBuilder);
  private toastService = inject(ToastMessages);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DependencyCreate>
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  dependencyForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    address: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    telephone: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]{10}$/),
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)],
    ],
  });

  async onSubmit() {
    if (this.dependencyForm.invalid) {
      this.dependencyForm.markAllAsTouched();
      return;
    }

    // const dependencyData = this.dependencyForm.value;
    const dependencyForm = this.dependencyForm.getRawValue();

    try {
      const result = await this.dependencyService.createDependency(
        dependencyForm
      );

      if (result) {
        console.log('Dependency created:');
        this.toastService.success('Dependencia registrada exitosamente');
        // await this.dependencyService.fetchDependencies();
      } else {
        console.warn('No se pudo crear la dependencia');
        this.toastService.error('No se pudo crear la dependencia');
      }
    } catch (error) {
      console.error('Error al crear la dependencia:', error);
    }

    this.closeModal();
    this.dependencyForm.reset();
  }
}
