import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'setup-master-password',
    loadComponent: () => import('./setup-master-password/setup-master-password.page').then( m => m.SetupMasterPasswordPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  }, 
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
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
  {
    path: 'protect-message',
    loadComponent: () => import('./protect-message/protect-message.page').then( m => m.ProtectMessagePage)
  },
];
