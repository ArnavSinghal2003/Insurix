import { Component, OnInit } from '@angular/core';
import { Card } from '../cards/cards';
import { PolicyTypes } from '../../services/PolicyTypes';
import { CommonModule } from '@angular/common';
import { Carousel } from '../carousel/carousel';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { AuthService } from '../../services/authService/auth-service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Card, Carousel, Navbar, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  policies = PolicyTypes;
  email: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.email = user?.email || null;
  }

  goToCategory(policyName: string): void {
    const formattedName = policyName.trim().replace(/\s+/g, '-');
    this.router.navigate(['home', formattedName]);
  }
}
