import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'configuracoes',
    loadComponent: () => import('./configuracoes/configuracoes.page').then( m => m.ConfiguracoesPage)
  },
  {
    path: 'add-password',
    loadComponent: () => import('./add-password/add-password.page').then( m => m.AddPasswordPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'security-message',
    loadComponent: () => import('./security-message/security-message.page').then( m => m.SecurityMessagePage)
  },
];
