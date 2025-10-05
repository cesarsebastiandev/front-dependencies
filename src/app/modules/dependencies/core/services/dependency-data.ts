import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DependencyResponse, Dependency } from './../interfaces/dependency';
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DependencyData {
  private URL_BASE = environment.apiSpringBoot;

  private privateDependencySignal = signal<Dependency[] | null>(null);
  dependencySignal = this.privateDependencySignal.asReadonly();

  private privateLoading = signal<boolean>(false);
  loading = this.privateLoading.asReadonly();

  private privateError = signal<string | null>(null);
  error = this.privateError.asReadonly();

  constructor(private http: HttpClient) {
    this.fetchDependencies();
  }

  async fetchDependencies(): Promise<Dependency[] | null> {
    this.privateLoading.set(true);
    this.privateError.set(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const dependencies = await firstValueFrom(
        this.http.get<Dependency[]>(`${this.URL_BASE}/dependencies`)
      );

      this.privateDependencySignal.set(dependencies ?? null);
      this.privateLoading.set(false);
      return dependencies ?? null;
    } catch (error) {
      console.error('Error fetching dependencies:', error);
      this.privateDependencySignal.set(null);
      this.privateError.set(
        'No se pudieron cargar las dependencias, hubo un error en el server.'
      );
      this.privateLoading.set(false);
      return null;
    }
  }

  async toggleDependencyStatus(
    id: number,
    isActive: boolean
  ): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.patch(
          `${this.URL_BASE}/dependencies/${id}/status?isActive=${isActive}`,
          {}
        )
      );
      const updatedList =
        this.privateDependencySignal()?.map((dep) =>
          dep.id === id ? { ...dep, is_active: isActive } : dep
        ) ?? [];

      this.privateDependencySignal.set(updatedList);

      return true;
    } catch (error) {
      console.error(
        `Error toggling status for dependency with ID ${id}:`,
        error
      );
      return false;
    }
  }

  async createDependency(
    dependency: Omit<
      Dependency,
      'id' | 'created_at' | 'updated_at' | 'is_active'
    >
  ): Promise<Dependency | null> {
    try {
      const response = await firstValueFrom(
        this.http.post<DependencyResponse>(
          `${this.URL_BASE}/dependencies`,
          dependency
        )
      );

      const newDependency = response.data;

      const current = this.privateDependencySignal();
      this.privateDependencySignal.set([...(current ?? []), newDependency]);

      return newDependency;
    } catch (error) {
      console.error('Error creating dependency:', error);
      return null;
    }
  }

  async updateDependency(
    id: number,
    updatedData: Partial<Dependency>
  ): Promise<Dependency | null> {
    try {
      const response = await firstValueFrom(
        this.http.put<DependencyResponse>(
          `${this.URL_BASE}/dependencies/${id}`,
          updatedData
        )
      );

      const updatedDependency = response.data;

      const updatedList =
        this.privateDependencySignal()?.map((dep) =>
          dep.id === id ? updatedDependency : dep
        ) ?? [];

      this.privateDependencySignal.set(updatedList);

      return updatedDependency;
    } catch (error) {
      console.error(`Error updating dependency with ID ${id}:`, error);
      return null;
    }
  }
}
