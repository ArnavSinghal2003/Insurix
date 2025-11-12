import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/authService/auth-service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit, OnDestroy {
  fullName: string | null = null;
  isLoggedIn: boolean = false;
  private userSub: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.getUserObservable().subscribe((user: User | null) => {
      this.fullName = user?.firstName || null; // ✅ Adjusted for nested fullName
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }

  login(): void {
    this.router.navigate(['/landing/login']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
