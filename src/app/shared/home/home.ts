import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MaterialModule } from '../../ui/material-module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MaterialModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  modules = [
    {
      title: 'Dependencies',
      description: 'This is the module for dependencies.',
      route: '/dashboard/dependencies/list',
    },
    {
      title: 'Admins',
      description: 'This is the module for admins.',
      route: '/dashboard/admin/admins',
    },
    {
      title: 'Users',
      description: 'This is the module for users.',
      route: '/dashboard/user/users',
    },
    {
      title: 'Editors',
      description: 'This is the module for editors.',
      route: '/dashboard/editor/editors',
    },
    {
      title: 'Viewers',
      description: 'This is the module for viewers.',
      route: '/dashboard/viewer/viewers',
    },
    {
      title: 'Cars',
      description: 'This is the module for cars.',
      route: '/dashboard/car/cars',
    },
    {
      title: 'Articles',
      description: 'This is the module for articles.',
      route: '/dashboard/article/articles',
    },
  ];
}
