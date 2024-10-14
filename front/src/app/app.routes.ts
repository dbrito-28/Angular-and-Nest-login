import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        //guards
        canActivate: [publicGuard()],
        //autenticacion
        loadChildren: () => import('./auth/features/shell/auth.routes'),

    },
    {
        path: 'dashboard',
        //guards
        canActivate: [privateGuard()],
        //dashboard
        loadComponent: () => import('./dashboard/dashboard.component'),
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    }
];
