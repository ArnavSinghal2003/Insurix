// services/policy-store.service.ts
import { Injectable } from '@angular/core';
import { Policy } from '../../models/Policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyStoreService {
  private purchasedPolicies: Policy[] = [];

  addPolicy(policy: Policy) {
    this.purchasedPolicies.push(policy);
  }

  getPolicies(): Policy[] {
    return this.purchasedPolicies;
  }
}
