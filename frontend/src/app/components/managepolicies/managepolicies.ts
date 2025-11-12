import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-manage-policies',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './managepolicies.html',
  styleUrls: ['./managepolicies.css']
})
export class ManagePoliciesComponent {
  @ViewChild('policyForm') policyForm!: NgForm;
  @ViewChild('imageInput') imageInput!: ElementRef;

  formData = {
    title: '',
    description: '',
    category: '',
    claimAmount: null as number | null,
    monthlyPremium: null as number | null,
    image: null as File | null
  };

  categories = [
    "Family-Floaters", "Term-Life", "Four-Wheeler", "Home", "Travel",
    "Individual-Health", "Whole-Life", "Two-Wheeler"
  ];

  successMessage = '';
  loading = false;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.formData.image = input.files[0];
    }
  }

  createPolicy(): void {
    // Check for form validity and image presence before proceeding
    if (this.policyForm.invalid || !this.formData.image) {
      // The button should be disabled via HTML, but this is a final guard
      alert('Please fill out all required fields and upload an image.');
      return;
    }

    const payload = new FormData();
    payload.append('title', this.formData.title);
    payload.append('description', this.formData.description);
    payload.append('category', this.formData.category);
    payload.append('claimAmount', String(this.formData.claimAmount ?? ''));
    payload.append('monthlyPremium', String(this.formData.monthlyPremium ?? ''));
    payload.append('image', this.formData.image);

    this.loading = true;

    this.http.post('http://localhost:5000/api/admin/policy/create', payload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        // ✅ Set success message first
        this.successMessage = '✅ Policy added successfully!';
        this.cdRef.detectChanges(); // Force Angular to update DOM

        // ✅ Reset form and image input
        this.policyForm.resetForm();
        this.imageInput.nativeElement.value = '';
        this.formData.image = null;
        this.formData.category = ''; // Manually reset select, as resetForm can sometimes miss it

        // ✅ Auto-hide message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

        this.loading = false;
      },
      error: (err) => {
        console.error('Policy creation failed:', err);
        alert('Failed to create policy. Please try again.');
        this.loading = false;
      }
    });
  }
}