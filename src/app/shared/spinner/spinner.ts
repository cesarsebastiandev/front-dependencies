import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../ui/material-module';

@Component({
  selector: 'app-spinner',
  imports: [MaterialModule],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {
  @Input() text: string = 'Cargando...';
}
