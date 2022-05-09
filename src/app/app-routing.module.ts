import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBenefComponent } from './add-benef/add-benef.component';
import { AvaListComponent } from './ava-list/ava-list.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { ClientPortalComponent } from './client-space/client-portal/client-portal.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { LoginComponent } from './login/login.component';
import { NavsideComponent } from './navside/navside.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RenewalComponent } from './renewal/renewal.component';
import { RgCheckerListComponent } from './rg-checker-list/rg-checker-list.component';
import { RgMakerListComponent } from './rg-maker-list/rg-maker-list.component';
import { AvaFormComponent } from './service/ava-form/ava-form.component';
import { StatsComponent } from './stats/stats.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'navbar',component:NavsideComponent},
 
    {path:'portail-ava',component: DefaultPageComponent ,canActivate:[AuthenticationGuard], children:[ 
    { path:'rechercher',component:AvaListComponent,canActivate:[AuthenticationGuard]  },
    {path:'user/management',component:UserComponent,canActivate:[AuthenticationGuard]},
    {path:'ava-portal',component:AvaFormComponent,canActivate:[AuthenticationGuard]},
    {path:'ava-renewal',component:RenewalComponent,canActivate:[AuthenticationGuard]},
    {path:'profile',component:ProfileComponent,canActivate:[AuthenticationGuard]},
    {path:'add-beneficiare/:id/:type',component:AddBenefComponent,canActivate:[AuthenticationGuard]},
    {path:'branch-list',component:BranchListComponent,canActivate:[AuthenticationGuard]},
    {path:'rg-maker-list',component:RgMakerListComponent,canActivate:[AuthenticationGuard]},
    {path:'rg-checker-list',component:RgCheckerListComponent,canActivate:[AuthenticationGuard]},
    {path:'stats',component:StatsComponent,canActivate:[AuthenticationGuard]},
    {path:'add-beneficiare',component:AddBenefComponent,canActivate:[AuthenticationGuard]}
  ]},
  
 
  
  
  {path:'',redirectTo: '/login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
