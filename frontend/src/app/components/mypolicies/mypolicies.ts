import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyPolicyCardComponent } from '../mypolicycard/mypolicycard';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-my-policies',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MyPolicyCardComponent, Navbar],
  templateUrl: './mypolicies.html',
  styleUrls: ['./mypolicies.css']
})
export class MyPoliciesComponent implements OnInit {
  purchases: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ success: boolean; purchases: any[] }>(
      'http://localhost:5000/api/users/mypolicies',
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.purchases = res.purchases;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch purchased policies:', err);
        this.loading = false;
      }
    });
  }

  handleClaimRequest(purchaseId: string): void {
    this.http.post(
      `http://localhost:5000/api/users/claim/request/${purchaseId}`,
      {},
      { withCredentials: true }
    ).subscribe({
      next: () => {
        const purchase = this.purchases.find(p => p._id === purchaseId);
        if (purchase) purchase.claimStatus = 'Under Process';
      },
      error: (err) => {
        console.error('Claim request failed:', err);
        alert('Failed to initiate claim. Please try again.');
      }
    });
  }
}
