import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  close, 
  shieldCheckmark, 
  codeSlash, 
  school,
  heart,
  logoGithub,
  mail,
  informationCircle
} from 'ionicons/icons';


@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]})
  
export class AboutPage {
  features: Array<{icon: string, title: string, description: string}> = [
    {
      icon: 'shield-checkmark',
      title: 'Criptografia Forte',
      description: 'As senhas são protegidas com criptografia AES-256'
    },
    {
      icon: 'finger-print',
      title: 'Biometria',
      description: 'Autenticação rápida e segura com digital ou face'
    },
    {
      icon: 'key',
      title: 'Gerador de Senhas',
      description: 'Gerencie e crie senhas fortes e aleatórias facilmente'
    },
  ];

  developers: Array<{name: string, contact?: string}> = [
    {
      name: 'Gustavo Huguenin',
    },
    {
      name: 'Nielson Lima',
    },
    
  ];

  techStack: Array<{name: string, icon?: string}> = [
    { name: 'Ionic Framework' },
    { name: 'Angular' },
    { name: 'TypeScript' },
    { name: 'Capacitor' },
    { name: 'SQLCipher' }
  ];

  constructor(private modalController: ModalController) {
    addIcons({ 
      close, 
      shieldCheckmark, 
      codeSlash, 
      school,
      heart,
      logoGithub,
      mail,
      informationCircle
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  openGithub() {
    window.open('https://github.com/dias-gxstavo/soteria', '_blank');
  }

  sendEmail() {
    window.location.href = 'mailto:gustavodiashug9@gmail.com?subject=Soteria - Contato';
  }
}