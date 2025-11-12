// import { Component, OnInit } from '@angular/core';
// import { RouterModule, Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { AuthService } from './services/authService/auth-service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './app.html',
//   styleUrls: ['./app.css']
// })
// export class AppComponent implements OnInit {
//   constructor(public router: Router, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.authService.restoreUserFromStorage();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/authService/auth-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.restoreUserFromStorage();
  }
}
