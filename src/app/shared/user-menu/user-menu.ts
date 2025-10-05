import { Component } from '@angular/core';
import { MaterialModule } from '../../ui/material-module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [MaterialModule, RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {}
