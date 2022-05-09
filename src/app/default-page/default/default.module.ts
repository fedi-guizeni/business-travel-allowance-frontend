import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';







import { NotificationModule } from 'src/app/notification.module';
import { NotificationService } from 'src/app/service/notification.service';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { UserComponent } from 'src/app/user/user.component';
import { FormsModule } from '@angular/forms';
import { ClientPortalComponent } from 'src/app/client-space/client-portal/client-portal.component';
import { AvaService } from 'src/app/service/ava.service';
import { AvaFormComponent } from 'src/app/service/ava-form/ava-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { NavsideComponent } from 'src/app/navside/navside.component';
import { RenewalComponent } from 'src/app/renewal/renewal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatMenuModule} from '@angular/material/menu';
import { HeaderComponent } from 'src/app/header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {SidebarModule} from 'ng-cdbangular';
import { AvaListComponent } from 'src/app/ava-list/ava-list.component';
import { DefaultPageComponent } from 'src/app//default-page/default-page.component';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { AuthenticationGuard } from 'src/app/guard/authentication.guard';
import { ProfileComponent } from '../../profile/profile.component';
import { AddBenefComponent } from '../../add-benef/add-benef.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BranchListComponent } from '../../branch-list/branch-list.component';
import { RgMakerListComponent } from '../../rg-maker-list/rg-maker-list.component';
import { RgCheckerListComponent } from 'src/app/rg-checker-list/rg-checker-list.component';
import { StatsComponent } from 'src/app/stats/stats.component'; 

import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    DefaultPageComponent,
    UserComponent,
    ClientPortalComponent,
    AvaFormComponent,
    NavsideComponent,
    RenewalComponent,
    HeaderComponent,
    AvaListComponent,
    ProfileComponent,
    AddBenefComponent,
    BranchListComponent,
    RgMakerListComponent,
    RgCheckerListComponent,
    StatsComponent
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule ,
    MatToolbarModule,MatListModule,MatIconModule,Ng2SearchPipeModule, MatMenuModule,FlexLayoutModule,SidebarModule, NgChartsModule,ReactiveFormsModule
  ],
  providers: [AuthenticationService , NotificationService ,AuthenticationGuard , UserService , AvaService,
     { provide: HTTP_INTERCEPTORS , useClass:AuthInterceptor ,multi:true}]

})
export class DefaultModule { }
