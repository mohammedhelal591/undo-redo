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
      import('@app/Components/form/form.component').then(
        (c) => c.FormComponent
      ),
  },
];
