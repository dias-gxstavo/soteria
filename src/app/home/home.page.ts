import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, settings, add, copyOutline, searchOutline, key, warning, shieldHalf } from 'ionicons/icons';
import { ModalController } from '@ionic/angular';
import { AddPasswordPage } from '../add-password/add-password.page'

interface Password {
  id: string;
  service: string;
  username: string;
  icon: string;
  tag?: string;
  date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, RouterOutlet]
})
export class HomePage {
  searchText: string = '';
  passwords: Password[] = [];
  
  totalPasswords: number = 4;
  weakPasswords: number = 3;

  constructor(private modalController: ModalController) {

    addIcons({ settings, home, add, copyOutline, searchOutline, key, warning, shieldHalf});
  }

  onSearch(event: any) {
    const query = event.target.value.toLowerCase();
    console.log('Pesquisando:', query);
    // Implementar lógica de pesquisa
  }

  async handleAddPassword() {
    const modal = await this.modalController.create({
      component: AddPasswordPage,
      cssClass: 'add-password',
      backdropDismiss: true
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.saved) {
      console.log('Nova senha adicionada:', data);
    }
  }

  handleCopy(passwordId: string) {
    console.log('Copiar senha:', passwordId);
    // Implementar lógica de copiar para clipboard
  }
}