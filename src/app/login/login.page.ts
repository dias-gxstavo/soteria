import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  eye, 
  eyeOff, 
  shieldCheckmark,
  fingerPrint,
  lockClosed
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class LoginPage implements OnInit {
  masterPassword: string = '';
  showPassword: boolean = false;
  isAuthenticating: boolean = false;
  loginError: boolean = false;
  biometricAvailable: boolean = false;
  biometricEnabled: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ 
      eye, 
      eyeOff, 
      shieldCheckmark,
      fingerPrint,
      lockClosed
    });
  }

  async ngOnInit() {
    // Verificar se biometria está disponível
    await this.checkBiometricAvailability();
  }

  async checkBiometricAvailability() {
    try {
      // Aqui você implementará a verificação real com Capacitor Biometric
      // const result = await BiometricAuth.checkAvailability();
      // this.biometricAvailable = result.isAvailable;
      
      // Simulação
      this.biometricAvailable = true;
      
      // Verificar se usuário habilitou biometria nas configurações
      // const settings = await this.storageService.get('biometric_enabled');
      // this.biometricEnabled = settings?.enabled || false;
      
      this.biometricEnabled = false; // Padrão: desabilitado
    } catch (error) {
      console.error('Erro ao verificar biometria:', error);
      this.biometricAvailable = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async authenticateWithPassword() {
    if (!this.masterPassword) return;

    this.isAuthenticating = true;
    this.loginError = false;

    try {
      // Simular validação da senha
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Aqui você implementará:
      // 1. Buscar hash armazenado
      // 2. Comparar com bcrypt
      // 3. Gerar chave de descriptografia
      // 4. Validar acesso

      const isValid = await this.validateMasterPassword(this.masterPassword);

      if (isValid) {
        console.log('Login bem-sucedido');
        this.router.navigate(['/home'], { replaceUrl: true });
      } else {
        this.loginError = true;
        this.masterPassword = '';
        await this.showToast('Senha incorreta. Tente novamente.', 'danger');
      }

    } catch (error) {
      console.error('Erro ao autenticar:', error);
      this.loginError = true;
      await this.showToast('Erro ao fazer login. Tente novamente.', 'danger');
    } finally {
      this.isAuthenticating = false;
    }
  }

  async validateMasterPassword(password: string): Promise<boolean> {
    // Implementar validação real
    // const storedHash = await this.storageService.get('master_password_hash');
    // return await bcrypt.compare(password, storedHash);
    
    // Simulação (aceita qualquer senha por enquanto)
    return password.length >= 8;
  }

  async authenticateWithBiometric() {
    if (!this.biometricAvailable) return;

    try {
      this.isAuthenticating = true;

      // Aqui você implementará a autenticação biométrica real
      // const result = await BiometricAuth.authenticate({
      //   reason: 'Desbloquear Soteria',
      //   title: 'Autenticação Biométrica'
      // });

      // Simulação
      await new Promise(resolve => setTimeout(resolve, 1500));

      // if (result.success) {
        console.log('Autenticação biométrica bem-sucedida');
        this.router.navigate(['/home'], { replaceUrl: true });
      // }

    } catch (error) {
      console.error('Erro na autenticação biométrica:', error);
      await this.showToast('Falha na autenticação biométrica', 'danger');
    } finally {
      this.isAuthenticating = false;
    }
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  onPasswordInput() {
    this.loginError = false;
  }
}