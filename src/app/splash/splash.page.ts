import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class SplashPage implements OnInit {
  showContent: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {

    setTimeout(() => {
      this.showContent = true;
    }, 200);

    setTimeout(() => {
      this.navigateToHome();
    }, 3500);
  }

  async navigateToHome() {
  const hasMasterPassword = await this.checkMasterPasswordExists();
  
  if (hasMasterPassword) {
    this.router.navigate(['/login'], { replaceUrl: true });
  } else {
    this.router.navigate(['/setup-master-password'], { replaceUrl: true });
  }
}

async checkMasterPasswordExists(): Promise<boolean> {
  // Implementar verificação real
  // const hash = await this.storageService.get('master_password_hash');
  // return hash !== null;
  
  // Simulação (sempre retorna false para primeira vez)
  return false;
}
}