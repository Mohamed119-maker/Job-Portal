import { Route, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { loggedGuard } from './core/guard/logged.guard';
import { dashboardGuard } from './core/guard/dashboard/dashboard.guard';
import { DetailsComponent } from './pages/details/details.component';
import { DetailsService } from './core/services/details/details.service';
import { inject } from '@angular/core';
import { JobsService } from './core/services/jobs/jobs.service';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        loadComponent: () => import('./layout/auth/auth.component').then(m => m.AuthComponent),

        children: [
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Login' }
        ],
        canActivate: [loggedGuard],


    },

    {
        path: '',
        loadComponent: () => import('./layout/blank/blank.component').then(m => m.BlankComponent),
        children: [
            { path: 'job-list', loadComponent: () => import('./pages/job-list/job-list.component').then(m => m.JobListComponent), title: 'Job List', canActivate: [authGuard] },
            {
                path: 'details/:id',
                component: DetailsComponent,
                data: { renderMode: 'prerender' },
                getPrerenderParams: () => {
                    const jobService = inject(JobsService);
                    return jobService.getAllIds().toPromise()
                        .then(ids => ids?.map(item => ({ id: item.id.toString() })) || []);
                }
            } as unknown as Route,
            { path: 'admin', loadComponent: () => import('./pages/dashboard/admin/admin.component').then(m => m.AdminComponent), title: 'Admin Dashboard', canActivate: [dashboardGuard] },
            { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent), title: 'Not Found' }
        ],

    }
];
