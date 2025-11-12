import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PolicyCheckoutCardComponent } from '../policy-checkout-card/policy-checkout-card';
import { FormsModule } from '@angular/forms';
import { Policy } from '../../models/Policy';
import { Navbar } from '../navbar/navbar';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-policy-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, PolicyCheckoutCardComponent, Navbar, HttpClientModule],
  templateUrl: './policy-checkout.html',
  styleUrls: ['./policy-checkout.css']
})
export class PolicyCheckoutComponent implements OnInit {
  policy!: Policy;
  loading = true;
  policyId!: string;

  formData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    nominee: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.policyId = this.route.snapshot.paramMap.get('id')!;
    if (this.policyId) {
      this.http.get<{ success: boolean; policy: Policy }>(
        `http://localhost:5000/api/users/policy/${this.policyId}`,
        { withCredentials: true }
      ).subscribe({
        next: (res) => {
          this.policy = res.policy;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch policy:', err);
          this.loading = false;
        }
      });
    }
  }

  isEmailInvalid(): boolean {
    const email = this.formData.email;
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }

  isPhoneInvalid(): boolean {
    const phone = this.formData.phone;
    if (!phone) return false;
    return phone.length !== 10 || !/^\d{10}$/.test(phone);
  }

  isAddressInvalid(): boolean {
    const address = this.formData.address;
    if (!address) return false;
    return address.length < 10;
  }

  checkout(): void {
    this.http.post(
      `http://localhost:5000/api/users/purchase/${this.policyId}`,
      {}, // No body needed
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.router.navigate(['/home/confirmation']);
      },
      error: (err) => {
        console.error('Purchase failed:', err);
        alert('Purchase failed. Please try again.');
      }
    });
  }
}
