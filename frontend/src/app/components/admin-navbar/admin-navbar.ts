import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.html',
  styleUrls: ['./admin-navbar.css']
})
export class AdminNavbar implements OnInit, OnDestroy {
  fullName: string | null = null;
  isLoggedIn: boolean = false;
  private userSub: Subscription | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.getUserObservable().subscribe((user: User | null) => {
      // Logic to get the admin's name, mirroring the user navbar
      this.fullName = user?.firstName || null;
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/landing']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}