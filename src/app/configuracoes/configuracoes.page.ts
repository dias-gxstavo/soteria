import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { AboutPage } from '../about/about.page'
import { SecurityMessagePage } from '../security-message/security-message.page'
import { ChangeMasterPasswordModalComponent } from '../change-master-password-modal/change-master-password-modal.component'

import { 
  home, 
  settings, 
  add, 
  fingerPrint, 
  lockClosed, 
  key, 
  trash, 
  informationCircle, 
  helpCircle, 
  logOut,
  chevronForward,
  book
} from 'ionicons/icons';

interface ConfigOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'toggle' | 'navigation' | 'action';
  value?: boolean;
  route?: string;
}

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.page.html',
  styleUrls: ['./configuracoes.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink, RouterOutlet]})

export class ConfiguracoesPage {

  securityOptions: ConfigOption[] = [
    {
      id: 'biometric',
      title: 'Autenticação Biométrica',
      subtitle: 'Use digital ou reconhecimento facial',
      icon: 'finger-print',
      type: 'toggle',
      value: false
    },
    {
      id: 'changeMasterPassword',
      title: 'Alterar Senha Mestra',
      icon: 'key',
      type: 'navigation',
      route: '/change-master-password'
    }
  ];

  // Dados e Privacidade
  dataOptions: ConfigOption[] = [
    {
      id: 'clearCache',
      title: 'Limpar Cache',
      icon: 'trash',
      type: 'action'
    }
  ];

  // Outras Opções
  otherOptions: ConfigOption[] = [
    {
      id: 'about',
      title: 'Sobre o Soteria',
      subtitle: 'Saiba mais sobre o projeto Soteria',
      icon: 'information-circle',
      type: 'navigation',
      route: '/about'
    },
    {
      id: 'about_protecao',
      title: 'Proteção de Dados',
      subtitle: 'Um apelo sobre a importância da proteção de dados em tempos modernos',
      icon: 'book',
      type: 'navigation',
      route: '/about'
    },
    {
      id: 'logout',
      title: 'Sair',
      icon: 'log-out',
      type: 'action'
    }
  ];

  constructor(private modalController: ModalController) {
    addIcons({ 
      home, 
      settings, 
      add, 
      fingerPrint, 
      lockClosed, 
      key, 
      trash, 
      informationCircle, 
      helpCircle, 
      logOut,
      chevronForward,
      book 
    });
  }

  onToggleChange(option: ConfigOption, event: any) {
    console.log(`${option.title} alterado para:`, event.detail.checked);
    option.value = event.detail.checked;
    // Implementar lógica de salvamento da configuração
  }

  async onOptionClick(option: ConfigOption) {
    if (option.id === 'about') {
      await this.openAboutModal();
    }
    else if (option.id === 'about_protecao') {
      await this.openAboutProtecaoModal();
    }
     else if (option.type === 'action') {
      this.handleAction(option.id);
    }
      else if (option.id === 'changeMasterPassword') {
      await this.openChangeMasterPasswordModal();
    }
  }

  handleAction(actionId: string) {
    switch(actionId) {
      case 'clearCache':
        console.log('Limpar cache');
        // Implementar lógica de limpar cache
        this.showConfirmAlert('Limpar Cache', 'Deseja realmente limpar o cache?');
        break;
      case 'logout':
        console.log('Sair');
        // Implementar lógica de logout
        this.showConfirmAlert('Sair', 'Deseja realmente sair do aplicativo?');
        break;
    }
  }

  async showConfirmAlert(title: string, message: string) {
    // Implementar alert de confirmação
    console.log(`Alert: ${title} - ${message}`);
  }

  async openAboutModal() {
    const modal = await this.modalController.create({
      component: AboutPage,
      cssClass: 'about-modal'
    });
    
    await modal.present();
  }

   async openAboutProtecaoModal() {
    const modal = await this.modalController.create({
      component: SecurityMessagePage,
      cssClass: 'security-message'
    });
    
    await modal.present();
  }

  async openChangeMasterPasswordModal() {
    const modal = await this.modalController.create({
      component: ChangeMasterPasswordModalComponent,
      cssClass: 'change-master-password-modal',
      backdropDismiss: false
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    if (data?.changed) {
      console.log('Senha mestra alterada com sucesso');
    }
  }
}

