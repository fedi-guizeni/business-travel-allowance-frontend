import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/Role.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { AvaService } from '../service/ava.service';
import { NotificationService } from '../service/notification.service';
@Component({
  selector: 'app-navside',
  templateUrl: './navside.component.html',
  styleUrls: ['./navside.component.css']
})
export class NavsideComponent implements OnInit ,OnDestroy{
  public user: User;
  public idLoggedIn:boolean;
  public datepdf:string;
  public datepdf2:string;
 
  constructor(private authenticationService:AuthenticationService , private notificationService:NotificationService ,private router:Router, private avaService :AvaService) { }
  

  ngOnInit(): void { this.user = this.authenticationService.getUserFromLocalCache();
 
    this.idLoggedIn=this.authenticationService.isUserLoggedIn()
    console.log(this.idLoggedIn)

  
  }



  public onLogOut():void{
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
    this.idLoggedIn = false;
    this.sendNotification(NotificationType.SUCCESS,'vous avez été déconnecté')
    console.log(this.idLoggedIn)
  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  
img="assets/images/atb.png"
 
  

  public get isSupervisor(): boolean {
    return this.getUserRole() === Role.REGULATORY_CHECKER
  }
  public get isBranchMaker(): boolean {
    return this.getUserRole() === Role.BRANCH_MAKER
  }
  public get isBranchChecker(): boolean {
    return this.getUserRole() === Role.BRANCH_CHECKER
  }
  public get isRegulatoryMaker(): boolean {
    return this.getUserRole() === Role.REGULATORY_MAKER
  }


  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  public exportAvasPdf(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.avaService.getPDFAvas().subscribe(x => {
      const blob = new Blob([x], {type:'application/pdf'});
    
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download =  `avas-${date}.pdf`;
      link.dispatchEvent(new MouseEvent('click' , {bubbles:true ,cancelable:true ,view:window}));

      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      },100)
    })
  }
  public exportBenefsPdf(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.avaService.getPDFBenefs().subscribe(x => {
      const blob = new Blob([x], {type:'application/pdf'});
    
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download =  `bénéficiaires-${date}.pdf`;
      link.dispatchEvent(new MouseEvent('click' , {bubbles:true ,cancelable:true ,view:window}));

      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      },100)
    })
  }
  public exportAvasCustomPdf(){
    var today = new Date();
    
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const formData = this.avaService.createFormDataforPdf(this.datepdf);
    if (this.datepdf==null) {
      this.sendNotification(NotificationType.WARNING ,`veulleir choisissez une date` ); 
    }
    this.avaService.getPDFAvasCustom(formData).subscribe(x => {
      const blob = new Blob([x], {type:'application/pdf'});
    
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download =  `A.V.A-${date}.pdf`;
      link.dispatchEvent(new MouseEvent('click' , {bubbles:true ,cancelable:true ,view:window}));

      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      },100)
    })
  }
  public exportBenefCustomPdf(){
    var today = new Date();
    
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const formData = this.avaService.createFormDataforPdf(this.datepdf2);
    if (this.datepdf2==null) {
      this.sendNotification(NotificationType.WARNING ,`veulleir choisissez une date` ); 
    }
    this.avaService.getPDFBenefCustom(formData).subscribe(x => {
      const blob = new Blob([x], {type:'application/pdf'});
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download =  `bénéficiaires-${date}.pdf`;
      link.dispatchEvent(new MouseEvent('click' , {bubbles:true ,cancelable:true ,view:window}));
  
      setTimeout(function(){
        window.URL.revokeObjectURL(data);
        link.remove();
      },100)
    })
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
  ngOnDestroy(): void {
    console.log(this.idLoggedIn)
  }
  
}
