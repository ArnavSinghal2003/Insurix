import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claimcard.html',
  styleUrls: ['./claimcard.css']
})
export class ClaimCardComponent {
  @Input() request: any;
  @Output() onAction = new EventEmitter<{ action: string, purchaseId: string, requestId: string }>();

  handleAction(action: string) {
    this.onAction.emit({
      action,
      purchaseId: this.request.purchase._id,
      requestId: this.request._id
    });
  }
}
