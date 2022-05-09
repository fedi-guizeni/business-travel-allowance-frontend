import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/Role.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public refreshing: boolean;
  private currentusername:string;
  private subscriptions : Subscription[]= [] ;
  constructor(private authenticationService:AuthenticationService ,  private notificationService:NotificationService , public userService:UserService ,private router:Router) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }
  public onUpdateCurrentUser(user:User):void{
    this.refreshing = true
    this.currentusername = this.authenticationService.getUserFromLocalCache().username;
    const formData = this.userService.createUserFromDate(this.currentusername, user);
    this.subscriptions.push(
      this.userService.UpdateUsers(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response)
         
       
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} updates successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

          this.refreshing = true
         
        }
      )
      );


  }
  public onLogOut():void{
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
    
    this.sendNotification(NotificationType.SUCCESS,'vous avez été déconnecté')
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Une erreur s est produite. Veuillez réessayer.');
    }
  }
  public get isAdmin(): boolean {
    return this.getUserRole() === Role.SUPER_ADMIN 
  }

  private clickButton(buttonId:string):void{
    document.getElementById(buttonId).click();
  }
  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

}
