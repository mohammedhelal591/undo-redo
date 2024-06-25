import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@app/form/form.component').then(
        (c) => c.FormComponent
      ),
  },
];
