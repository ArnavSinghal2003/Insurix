import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClaimCardComponent } from '../claimcard/claimcard';

@Component({
  selector: 'app-process-claims',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ClaimCardComponent],
  templateUrl: './processclaims.html',
  styleUrls: ['./processclaims.css']
})
export class ProcessClaimsComponent implements OnInit {
  requests: any[] = [];
  loading = false;
  
  // NEW: Feedback message property
  feedbackMessage: string | null = null; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    this.loading = true;
    this.http.get('http://localhost:5000/api/admin/claims', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.requests = res.requests;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch requests:', err);
          this.loading = false;
        }
      });
  }

  handleClaimAction(event: { action: string, purchaseId: string, requestId: string }) {
    
    // Optimistic UI update: show loading/feedback immediately
    this.feedbackMessage = `Processing claim (${event.action})...`;

    this.http.put(`http://localhost:5000/api/admin/claims/${event.purchaseId}`, { action: event.action }, { withCredentials: true })
      .subscribe({
        next: () => {
          // Second API call (Delete Request)
          this.http.delete(`http://localhost:5000/api/admin/request/${event.requestId}`, { withCredentials: true })
            .subscribe({
              next: () => {
                // Remove the claim card from the UI
                this.requests = this.requests.filter(r => r._id !== event.requestId);
                
                // Show success message
                this.feedbackMessage = `Claim successfully ${event.action.toLowerCase()}!`;
                
                // Clear message after 3 seconds
                setTimeout(() => { this.feedbackMessage = null; }, 3000);
              },
              error: (err) => {
                console.error('Failed to delete request:', err);
                this.feedbackMessage = `Error: Failed to finalize claim deletion.`;
              }
            });
        },
        error: (err) => {
          console.error('Failed to update claim status:', err);
          this.feedbackMessage = `Error: Failed to ${event.action.toLowerCase()} claim.`;
        }
      });
  }
}