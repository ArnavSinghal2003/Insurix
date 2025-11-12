import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PolicyCard } from '../policy-card/policy-card';
import { Policy } from '../../models/Policy';
import { Navbar } from "../navbar/navbar";
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-policies',
  standalone: true,
  imports: [CommonModule, PolicyCard, Navbar, HttpClientModule],
  templateUrl: './category-policies.html',
  styleUrls: ['./category-policies.css']
})
export class CategoryPoliciesComponent implements OnInit {
  filteredPolicies: Policy[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const rawCategory = params.get('categoryName') || '';
      const formattedCategory = rawCategory.trim();

      this.http.get<{ success: boolean; policies: Policy[] }>(
        `http://localhost:5000/api/users/policies/${formattedCategory}`,
        { withCredentials: true }
      ).subscribe({
        next: (res) => {
          this.filteredPolicies = res.policies;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to fetch policies:', err);
          this.loading = false;
        }
      });
    });
  }
}
