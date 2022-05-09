import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/Role.enum';
import { CustomhttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit , OnDestroy {
  private titleSubject = new BehaviorSubject<String>('Utilisateurs')
  public titleAction$ = this.titleSubject.asObservable();
  public user: User;
  public users :User[];
  public refreshing: boolean;
  public  selectedUser: User;
  private subscriptions : Subscription[]= [] ;
  public editUser = new User();
   private currentusername:string
 

  constructor(public userService:UserService , private notificationService:NotificationService , private authenticationService:AuthenticationService
    ,private router:Router) {}
  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getUsers(true);
  
  }

  public changeTitle(title:string):void{
    this.titleSubject.next(title);
  }

  public getUsers(showNotification: boolean):void{
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe({
        next:
      
        
        (response:User[])=>{
          this.userService.addUsersToLocalCache(response);
          this.users=response;
          this.refreshing=false
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS ,`${response.length} utilisateurs chargés avec succès` );
            
          }
        },error:
        (errorrResponse:HttpErrorResponse)=>{
          this.sendNotification(NotificationType.ERROR, errorrResponse.error.message)
          this.refreshing = false;

        }
      })
    )
  }

  public onSelectUser(selectedUser:User):void{
    this.selectedUser = selectedUser;
  this.clickButton("openUserInfo");
  }
  public saveNewUser(): void{
   this.clickButton('new-user-save');
  }
  public onAddNewUser(userForm: NgForm): void {
    const formData = this.userService.createUserFromDate(null, userForm.value);
    this.subscriptions.push(
      this.userService.addUser(formData).subscribe(
        (response: User) => {
          this.clickButton('new-user-close');
          this.getUsers(false);
       
          userForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} ajouté avec succès`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
         
        }
      )
      );
  } 

  public searchUsers(searchTerm: string): void {
    const results: User[] = [];
    for (const user of this.userService.getUsersFromLocalCache()) {
      if (user.firstName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.lastName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.username?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          user.userId?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !searchTerm) {
      this.users = this.userService.getUsersFromLocalCache();
    }
  }
  public onEditUser(appuser:User):void{
    this.editUser=appuser;
    this.currentusername =  appuser.username
    this.clickButton('openUserEdit');

  }
  public onUserDelete():void{
   
    this.clickButton('openUserDelete');

  }
  public onUpdateCurrentUser(user:User):void{
    this.refreshing = true
    this.currentusername = this.authenticationService.getUserFromLocalCache().username;
    const formData = this.userService.createUserFromDate(this.currentusername, user);
    this.subscriptions.push(
      this.userService.UpdateUsers(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response)
          this.getUsers(false);
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName}  mis à jour avec succés`);
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
  public onUpdateUser():void{
    const formData = this.userService.createUserFromDate(this.currentusername,this.editUser);
    this.subscriptions.push(
      this.userService.UpdateUsers(formData).subscribe(
        (response: User) => {
          this.clickButton('closeEditUserModalButton');
          this.getUsers(false);
       
          this.sendNotification(NotificationType.SUCCESS, `${response.firstName} ${response.lastName} mis à jour avec succés`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
         
        }
      )
      );
  }

   public onDeleteUser(userId:number):void{
     this.subscriptions.push(
       this.userService.deleteUser(userId).subscribe(
         (response:CustomhttpResponse)=>{
           this.sendNotification(NotificationType.SUCCESS,response.message);
           this.getUsers(false)
         },(errorResponse:HttpErrorResponse)=>{
           this.sendNotification(NotificationType.ERROR , errorResponse.error.message)
         }
       )
     )

   }
   public onResetPassword(emailForm:NgForm):void{
     this.refreshing = true;
     const emailAdresse= emailForm.value['reset-password-email']
     console.log(emailAdresse)
     this.subscriptions.push(
       this.userService.resetPassword(emailAdresse).subscribe(
         (response:CustomhttpResponse)=>{
          this.sendNotification(NotificationType.SUCCESS,response.message);
          this.refreshing=false
           
         },(errorResponse:HttpErrorResponse)=>{
          this.sendNotification(NotificationType.WARNING , errorResponse.error.message)
          this.refreshing=false
        },
       ()=> emailForm.reset()
       )
     )
   }
   public get isSupervisor(): boolean {
    return this.getUserRole() === Role.REGULATORY_CHECKER
  }

  
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'Une erreur s est produite. Veuillez réessayer.');
    }
  }
  private clickButton(buttonId:string):void{
    document.getElementById(buttonId).click();
  }
  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }
 
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    location.reload();
  }

  
}
