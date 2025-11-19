import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  close, 
  eye, 
  eyeOff, 
  key,
  checkmarkCircle,
  alertCircle,
  shieldCheckmark
} from 'ionicons/icons';

interface PasswordRequirement {
  label: string;
  met: boolean;
  validator: (password: string) => boolean;
}

@Component({
  selector: 'app-change-master-password-modal',
  templateUrl: './change-master-password-modal.component.html',
  styleUrls: ['./change-master-password-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ChangeMasterPasswordModalComponent {
  // Form fields
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  // UI states
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isChanging: boolean = false;
  isSuccess: boolean = false;
  currentPasswordError: boolean = false;

  // Password requirements
  passwordRequirements: PasswordRequirement[] = [
    {
      label: 'Mínimo de 8 caracteres',
      met: false,
      validator: (pwd) => pwd.length >= 8
    },
    {
      label: 'Pelo menos uma letra maiúscula',
      met: false,
      validator: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      label: 'Pelo menos uma letra minúscula',
      met: false,
      validator: (pwd) => /[a-z]/.test(pwd)
    },
    {
      label: 'Pelo menos um número',
      met: false,
      validator: (pwd) => /[0-9]/.test(pwd)
    },
    {
      label: 'Pelo menos um caractere especial',
      met: false,
      validator: (pwd) => /[^a-zA-Z0-9]/.test(pwd)
    }
  ];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    addIcons({ 
      close, 
      eye, 
      eyeOff, 
      key,
      checkmarkCircle,
      alertCircle,
      shieldCheckmark
    });
  }

  closeModal(data?: any) {
    this.modalController.dismiss(data);
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
    switch(field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  onNewPasswordChange() {
    this.passwordRequirements.forEach(req => {
      req.met = req.validator(this.newPassword);
    });
  }

  get allRequirementsMet(): boolean {
    return this.passwordRequirements.every(req => req.met);
  }

  get passwordsMatch(): boolean {
    return this.confirmPassword !== '' && this.newPassword === this.confirmPassword;
  }

  get passwordsDontMatch(): boolean {
    return this.confirmPassword !== '' && this.newPassword !== this.confirmPassword;
  }

  get canSubmit(): boolean {
    return this.currentPassword !== '' && 
           this.allRequirementsMet && 
           this.passwordsMatch;
  }

  async validateCurrentPassword(): Promise<boolean> {
    // Aqui você implementará a validação real com o back-end
    // Por enquanto, simula uma validação
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulação: aceita qualquer senha como válida
    // Em produção, isso deve validar com o hash armazenado
    return true;
  }

  async changePassword() {
    if (!this.canSubmit) return;

    this.isChanging = true;
    this.currentPasswordError = false;

    try {
      // Validar senha atual
      const isCurrentValid = await this.validateCurrentPassword();
      
      if (!isCurrentValid) {
        this.currentPasswordError = true;
        this.isChanging = false;
        await this.showToast('Senha atual incorreta', 'danger');
        return;
      }

      // Simular mudança de senha
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Aqui você implementará a lógica real de mudança de senha
      console.log('Senha alterada com sucesso');
      
      this.isChanging = false;
      this.isSuccess = true;

      await this.showToast('Senha mestra alterada com sucesso!', 'success');

      // Fechar modal após 2 segundos
      setTimeout(() => {
        this.closeModal({ changed: true });
      }, 2000);

    } catch (error) {
      this.isChanging = false;
      console.error('Erro ao alterar senha:', error);
      await this.showToast('Erro ao alterar senha. Tente novamente.', 'danger');
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  cancel() {
    this.closeModal({ changed: false });
  }
}