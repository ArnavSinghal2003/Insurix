import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Landing } from './components/landing/landing';
import { AdminHome } from './components/admin-home/admin-home';
import { CategoryPoliciesComponent } from './components/category-policies/category-policies';
import { PolicyCheckoutComponent } from './components/policy-checkout/policy-checkout'; 
import { MyPoliciesComponent } from './components/mypolicies/mypolicies';
import { Profile } from './components/profile/profile';
import { Confirmation } from './components/confirmation/confirmation';
import { ManagePoliciesComponent } from './components/managepolicies/managepolicies';
import { ProcessClaimsComponent } from './components/processclaims/processclaims';
import { AdminLandingMessage } from './components/admin-landing-message/admin-landing-message'; // ✅ Added this
import { Contactus } from './components/contactus/contactus';
import { Aboutus } from './components/aboutus/aboutus';
import { Myclaims } from './components/myclaims/myclaims';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home/contactus', component: Contactus },
  { path: 'home/aboutus', component: Aboutus },
  { path: 'home/confirmation', component: Confirmation },
  { path: 'home/myclaims', component: Myclaims},
  { path: 'home/:categoryName/:id', component: PolicyCheckoutComponent },
  { path: 'home/:categoryName', component: CategoryPoliciesComponent },
  { path: 'home', component: Home },
  { path: 'myPolicies', component: MyPoliciesComponent },
  { path: 'myclaims', component: Myclaims },

  {
    path: 'adminHome',
    component: AdminHome,
    children: [
      { path: '', component: AdminLandingMessage }, // ✅ Default landing
      { path: 'managepolicies', component: ManagePoliciesComponent, canActivate: [AdminGuard] },
      { path: 'processclaims', component: ProcessClaimsComponent, canActivate: [AdminGuard] }
    ]
  },
  {
    path: 'landing',
    component: Landing,
    children: [
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: 'profile', component: Profile }
];
