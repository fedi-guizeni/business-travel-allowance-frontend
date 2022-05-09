import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { ClientPortalComponent } from './client-space/client-portal/client-portal.component';
import { AvaService } from './service/ava.service';
import { AvaFormComponent } from './service/ava-form/ava-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { DefaultModule } from './default-page/default/default.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent, 
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    BrowserAnimationsModule,DefaultModule
    
  ],
  providers: [AuthenticationService , NotificationService ,AuthenticationGuard , UserService , AvaService,
     { provide: HTTP_INTERCEPTORS , useClass:AuthInterceptor ,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }