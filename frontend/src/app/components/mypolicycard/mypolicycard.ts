import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-policy-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mypolicycard.html',
  styleUrls: ['./mypolicycard.css']
})
export class MyPolicyCardComponent {
  @Input() policy!: any;
  @Input() claimStatus!: string;
  @Input() purchaseId!: string;
  @Output() claimRequested = new EventEmitter<string>();

  requestClaim(): void {
    this.claimRequested.emit(this.purchaseId);
  }
}
