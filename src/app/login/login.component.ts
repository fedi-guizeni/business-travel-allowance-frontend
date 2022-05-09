import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderTupe } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/Role.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy {
public showLoading : boolean;
private subscriptions:Subscription[] = [];

  constructor(private router: Router ,
     private authetificationService: AuthenticationService,
     private notificationService:NotificationService) { }

  ngOnInit(): void {
    if (this.authetificationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management')
     
      
    }else{
      this.router.navigateByUrl('/login')
    }
  }
  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authetificationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderTupe.JWT_TOKEN);
          this.authetificationService.saveToken(token);
          this.authetificationService.addUserToLocalCache(response.body);
       
            this.router.navigateByUrl('/portail-ava');
          
          
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorrNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }
   private sendErrorrNotification(ERROR: NotificationType, message: string) {
   if(message){
     this.notificationService.notify(ERROR , message)
   }else{
    this.notificationService.notify(ERROR , 'une erreur est survenue, veuillez réessayer.')
   }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub =>sub.unsubscribe())
   
      
  }

}
