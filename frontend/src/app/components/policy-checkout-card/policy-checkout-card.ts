// components/policy-checkout-card/policy-checkout-card.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-policy-checkout-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policy-checkout-card.html',
  styleUrls: ['./policy-checkout-card.css']
})
export class PolicyCheckoutCardComponent {
  @Input() policyName!: string;
  @Input() policyDetails!: string;
  @Input() claimAmount!: number;
  @Input() monthlyPremium!: number;
  @Input() imageUrl!: string;
}
