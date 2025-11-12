import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claimed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claimed.html',
  styleUrls: ['./claimed.css']
})
export class Claimed {
  @Input() policy: any;
  @Input() claimStatus: string = '';
  @Input() requestedAt: string = '';
  @Input() note: string = '';
}
