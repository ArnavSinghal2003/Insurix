import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class Landing {}
