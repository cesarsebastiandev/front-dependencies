import {
  AfterViewInit,
  Component,
  effect,
  inject,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../ui/material-module';
import { Dependency } from '../core/interfaces/dependency';
import { DialogManager } from '../../../shared/dialog-core/dialog-manager';
import { ToastMessages } from '../../../services/toast-messages';
import { DependencyEdit } from '../dependency-edit/dependency-edit';
import { DependencyData } from '../core/services/dependency-data';
import { DependencyCreate } from '../dependency-create/dependency-create';
import { Spinner } from '../../../shared/spinner/spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dependencies-table',
  imports: [MaterialModule, Spinner, CommonModule],
  templateUrl: './dependencies-table.html',
  styleUrl: './dependencies-table.scss',
})
export class DependenciesTable {
  displayedColumns: string[] = [
    'id',
    'name',
    'address',
    'telephone',
    'email',
    'is_active',
    'created_at',
    'updated_at',
    'actions',
  ];

  dataSource: MatTableDataSource<Dependency>;
  private dependencyService = inject(DependencyData);
  protected dependencyData = this.dependencyService.dependencySignal;
  protected loading = this.dependencyService.loading;
  protected error = this.dependencyService.error;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private toastS: ToastMessages,
    private dialogService: DialogManager
  ) {
    //Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource<Dependency>([]);
    effect(() => {
      const dependencies = this.dependencyData();
      //   console.log('🌀 Effect triggered, dependencies:', dependencies);
      if (dependencies) {
        this.attachDataToTable(dependencies);
      }
    });
  }

  private attachDataToTable(dependencies: Dependency[]) {
    setTimeout(() => {
      this.dataSource.data = dependencies;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.firstPage();
    });
  }

  dialogRef: MatDialogRef<DependencyCreate> | undefined;
  openCreateDependency() {
    this.dialogRef = this.dialog.open(DependencyCreate, {
      width: '90vw',
      maxHeight: '90vh',
    });
  }

  openEditDependency(data: any) {
    this.dialog.open(DependencyEdit, {
      data: { data: data },
      width: '90vw',
      maxHeight: '90vh',
    });
  }

  ngAfterViewInit() {
    // Custom filterPredicate
    this.dataSource.filterPredicate = (data: Dependency, filter: string) => {
      const term = filter.trim().toLowerCase();

      const status = data.is_active ? 'activo' : 'inactivo';

      return (
        data.name.toLowerCase().includes(term) ||
        data.address.toLowerCase().includes(term) ||
        data.telephone.toLowerCase().includes(term) ||
        data.email.toLowerCase().includes(term) ||
        status.includes(term)
      );
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async toggleStatus(id: number, newStatus: boolean) {
    try {
      const success = await this.dependencyService.toggleDependencyStatus(
        id,
        newStatus
      );
      if (success) {
        this.toastS.success(
          `Dependencia ${newStatus ? 'activada' : 'desactivada'} correctamente.`
        );
      } else {
        this.toastS.error('No se pudo actualizar el estado.');
      }
    } catch (error) {
      console.error('Error al cambiar el estado de la dependencia', error);
      this.toastS.error('Ocurrió un error al actualizar el estado.');
    }
  }

  async openDeactivateDependency(id: number, isActive: boolean) {
    const actionText = isActive ? 'desactivar' : 'activar';
    const confirmed = await this.dialogService.openConfirmDialog(
      `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} dependencia`,
      `¿Estás seguro que deseas ${actionText} esta dependencia?`
    );

    if (confirmed) {
      await this.toggleStatus(id, !isActive);
    }
  }
}
