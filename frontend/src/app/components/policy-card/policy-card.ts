import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-card',
  standalone: true,
  templateUrl: './policy-card.html',
  styleUrls: ['./policy-card.css']
})
export class PolicyCard {
  @Input() _id!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() claimAmount!: number;
  @Input() monthlyPremium!: number;
  @Input() image!: { url: string };
  @Input() category!: string;

  constructor(private router: Router) {}

  goToCheckout(): void {
    const formattedCategory = this.category.trim();
    this.router.navigate(['home', formattedCategory, this._id]);
  }
}
