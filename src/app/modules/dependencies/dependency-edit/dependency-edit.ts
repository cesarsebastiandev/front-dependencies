import { Component, Inject, inject } from '@angular/core';
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
  selector: 'app-dependency-edit',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dependency-edit.html',
  styleUrl: './dependency-edit.scss',
})
export class DependencyEdit {
  private dependencyService = inject(DependencyData);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastMessages);

  dependencyData: any = {};
  id: string = '';
  name: string = '';
  address: string = '';
  telephone: string = '';
  email: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DependencyEdit>
  ) {
    this.dependencyData = this.data;
    console.log('dependency Data', this.dependencyData);

    this.id = this.dependencyData.data.id;
    console.log('dependency_id', this.id);

    this.name = this.dependencyData.data.name;
    this.address = this.dependencyData.data.address;
    this.telephone = this.dependencyData.data.telephone;
    this.email = this.dependencyData.data.email;

    this.dependencyForm.controls['name'].setValue(this.name);
    this.dependencyForm.controls['address'].setValue(this.address);
    this.dependencyForm.controls['telephone'].setValue(this.telephone);
    this.dependencyForm.controls['email'].setValue(this.email);
  }

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

  // onSubmit() {
  //   // if (this.dependencyForm.invalid) return;
  //   if (this.dependencyForm.invalid) {
  //     this.dependencyForm.markAllAsTouched();
  //     return;
  //   }
  //   console.log(this.dependencyForm.value);
  //   this.dependencyForm.reset();
  // }

  async onSubmit() {
    if (this.dependencyForm.invalid) {
      this.dependencyForm.markAllAsTouched();
      return;
    }
    const updatedData = this.dependencyForm.getRawValue();
    try {
      const result = await this.dependencyService.updateDependency(
        this.data.data.id,
        updatedData
      );

      if (result) {
        this.toastService.success('Dependencia actualizada exitosamente');
        this.closeModal();
      } else {
        this.toastService.error('No se pudo actualizar la dependencia');
      }
    } catch (error) {
      console.error('Error al actualizar la dependencia:', error);
      this.toastService.error('Ocurrió un error al actualizar');
    }
  }
}
