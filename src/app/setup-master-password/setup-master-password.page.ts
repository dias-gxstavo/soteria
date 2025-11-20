import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  eye, 
  eyeOff, 
  shieldCheckmark,
  checkmarkCircle,
  alertCircle,
  lockClosed
} from 'ionicons/icons';

interface PasswordRequirement {
  label: string;
  met: boolean;
  validator: (password: string) => boolean;
}

@Component({
  selector: 'app-setup-master-password',
  templateUrl: './setup-master-password.page.html',
  styleUrls: ['./setup-master-password.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class SetupMasterPasswordPage {
  masterPassword: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isCreating: boolean = false;

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

  constructor(private router: Router) {
    addIcons({ 
      eye, 
      eyeOff, 
      shieldCheckmark,
      checkmarkCircle,
      alertCircle,
      lockClosed
    });
  }

  onPasswordChange() {
    this.passwordRequirements.forEach(req => {
      req.met = req.validator(this.masterPassword);
    });
  }

  get allRequirementsMet(): boolean {
    return this.passwordRequirements.every(req => req.met);
  }

  get passwordsMatch(): boolean {
    return this.confirmPassword !== '' && this.masterPassword === this.confirmPassword;
  }

  get passwordsDontMatch(): boolean {
    return this.confirmPassword !== '' && this.masterPassword !== this.confirmPassword;
  }

  get canSubmit(): boolean {
    return this.allRequirementsMet && this.passwordsMatch;
  }

  togglePasswordVisibility(field: 'password' | 'confirm') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  async createMasterPassword() {
    if (!this.canSubmit) return;

    this.isCreating = true;

    try {
      // Simular criação da senha mestra
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Aqui você implementará:
      // 1. Hash da senha (bcrypt)
      // 2. Gerar chave de criptografia
      // 3. Salvar hash no storage seguro
      // 4. Marcar como configurado

      console.log('Senha mestra criada com sucesso');

      // Navegar para home
      this.router.navigate(['/home'], { replaceUrl: true });

    } catch (error) {
      console.error('Erro ao criar senha mestra:', error);
      this.isCreating = false;
    }
  }
}