import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './cards.html',
  styleUrls: ['./cards.css']
})
export class Card {
  @Input() policyName!: string;
  @Input() category!: string;
  @Input() claimAmount!: number;
  @Input() monthlyPremium!: number;
  @Input() policyDetails!: string;
  @Input() imagePath!: string;
}
