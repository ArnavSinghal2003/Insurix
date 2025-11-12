import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/loginService/login-service';
import { AuthService } from '../../services/authService/auth-service';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginForm: FormGroup;
  IsValid: boolean | null = null;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Please enter valid credentials.');
      return;
    }

    const credentials = this.loginForm.value;

    this.loginService.loginUser(credentials).subscribe({
      next: (res) => {
        this.authService.setUser(res.user);
        this.IsValid = true;

        const redirectPath = res.user.role === 'admin' ? '/adminHome' : '/home';
        this.router.navigate([redirectPath]);
      },
      error: (err) => {
        this.IsValid = false;
        alert(err.error.message || 'Login failed');
      }
    });
  }
}
