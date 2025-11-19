import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { close, eye, eyeOff, refresh, copy, checkmarkCircle, globe, mail, person} from 'ionicons/icons';

interface PasswordStrength {
  level: number; // 0-4
  label: string;
  color: string;
}

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.page.html',
  styleUrls: ['./add-password.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]})

export class AddPasswordPage {

  serviceName: string = '';
  username: string = '';
  password: string = '';
  url: string = '';
  notes: string = '';
  category: string = '';

  // UI states
  showPassword: boolean = false;
  isGenerating: boolean = false;
  isSaving: boolean = false;
  isSaved: boolean = false;

  // Password generator options
  passwordLength: number = 16;
  includeUppercase: boolean = true;
  includeLowercase: boolean = true;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;

  passwordStrength: PasswordStrength = {
    level: 0,
    label: 'Muito Fraca',
    color: '#e74c3c'
  };

  constructor(private modalController: ModalController) {
    addIcons({ 
      close, 
      eye, 
      eyeOff, 
      refresh, 
      copy, 
      checkmarkCircle,
      globe,
      mail,
      person
    });
  }

  closeModal(data?: any) {
    this.modalController.dismiss(data);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordChange() {
    this.calculatePasswordStrength();
  }

  calculatePasswordStrength() {
    if (!this.password) {
      this.passwordStrength = {
        level: 0,
        label: 'Muito Fraca',
        color: '#e74c3c'
      };
      return;
    }

    let strength = 0;
    
    // Comprimento
    if (this.password.length >= 8) strength++;
    if (this.password.length >= 12) strength++;
    
    // Complexidade
    if (/[a-z]/.test(this.password) && /[A-Z]/.test(this.password)) strength++;
    if (/[0-9]/.test(this.password)) strength++;
    if (/[^a-zA-Z0-9]/.test(this.password)) strength++;

    // Normalizar para 0-4
    strength = Math.min(4, Math.floor(strength * 4 / 5));

    const strengthLevels = [
      { level: 0, label: 'Muito Fraca', color: '#e74c3c' },
      { level: 1, label: 'Fraca', color: '#e67e22' },
      { level: 2, label: 'Média', color: '#f39c12' },
      { level: 3, label: 'Forte', color: '#27ae60' },
      { level: 4, label: 'Muito Forte', color: '#2ecc71' }
    ];

    this.passwordStrength = strengthLevels[strength];
  }

  generatePassword() {
    this.isGenerating = true;

    setTimeout(() => {
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%&*()_+-=[]{}|;:,.<>?';

      let chars = '';
      if (this.includeUppercase) chars += uppercase;
      if (this.includeLowercase) chars += lowercase;
      if (this.includeNumbers) chars += numbers;
      if (this.includeSymbols) chars += symbols;

      if (chars === '') chars = lowercase; // Fallback

      let generatedPassword = '';
      for (let i = 0; i < this.passwordLength; i++) {
        generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      this.password = generatedPassword;
      this.calculatePasswordStrength();
      this.isGenerating = false;
    }, 500);
  }

  async copyPassword() {
    if (!this.password) return;
    
    try {
      await navigator.clipboard.writeText(this.password);
      console.log('Senha copiada!');
      // Mostrar toast de sucesso
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  }

  async savePassword() {
    if (!this.serviceName || !this.password) {
      console.log('Preencha os campos obrigatórios');
      return;
    }

    this.isSaving = true;

    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.isSaving = false;
    this.isSaved = true;

    console.log('Senha salva:', {
      serviceName: this.serviceName,
      username: this.username,
      password: this.password,
      url: this.url,
      category: this.category,
      notes: this.notes
    });

    // Fechar após 1 segundo
    setTimeout(() => {
      this.closeModal();
    }, 1000);

    // Aqui você implementará a integração com o back-end
  }

  cancel() {
    this.closeModal();
  }
}