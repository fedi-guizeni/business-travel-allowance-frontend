import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authentificationServie: AuthenticationService , private router:Router
    ,private notificationService:NotificationService){}
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
     
    return this.isUserLoggedIn();
   
  }

private isUserLoggedIn():boolean{
  if (this.authentificationServie.isUserLoggedIn) {
    return true
    
  } this.router.navigate(['/login']); 
  this.notificationService.notify(NotificationType.ERROR , 'vous devez vous connecter pour accéder à cette page')
  return false 
  

  }
  
  
}
