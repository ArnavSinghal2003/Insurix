import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Claimed } from '../claimed/claimed';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-myclaims',
  standalone: true,
  imports: [CommonModule, Claimed, Navbar],
  templateUrl: './myclaims.html',
  styleUrls: ['./myclaims.css']
})
export class Myclaims implements OnInit {
  requests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5000/api/users/myclaimhistory', { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.requests = res.history; // ✅ updated key from API response
        },
        error: (err) => {
          console.error('Error fetching claim history:', err);
        }
      });
  }
}
