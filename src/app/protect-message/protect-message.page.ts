import { Component, OnInit } from '@angular/core';
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
  selector: 'app-protect-message',
  templateUrl: './protect-message.page.html',
  styleUrls: ['./protect-message.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]})
  
export class ProtectMessagePage{

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

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
