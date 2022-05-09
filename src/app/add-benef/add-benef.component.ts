import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { AvaType } from '../enum/ava-type';
import { NotificationType } from '../enum/notification-type.enum';
import { AvaFe } from '../model/ava';
import { Benef } from '../model/benef';
import { AuthenticationService } from '../service/authentication.service';
import { AvaService } from '../service/ava.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-add-benef',
  templateUrl: './add-benef.component.html',
  styleUrls: ['./add-benef.component.css']
})
export class AddBenefComponent implements OnInit , OnDestroy {
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  public  benef = new Benef();
  public  idbenef: string;
  public benefs : Benef[] = [];
  public id:string;
  public type:string;
  public ro:boolean = false;
  public date:Date = new Date();
  constructor(private notificationService: NotificationService , private avaService :AvaService  ,public activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      this.type = params.get('type'); 
      if (this.id!==null) { this.ro = true}
  });

  }


  public  onBenefAdd(avaFe:AvaFe ):void{
   
    
    this.benefs.push(this.benef)
    this.showLoading = true;
    if(avaFe.avaType===AvaType.AUTREACTIVITE){  
        this.subscriptions.push(
      this.avaService.addBenefFe(avaFe).subscribe({
        next:
      
        (response: AvaFe) => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Un nouveau beneficiare a été créé pour ${response.idClient}`);
          this.benefs = []
        },error:
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
          this.benefs = []
        }
      })
    );  }else
      { this.avaService.addBenefExMe(avaFe).subscribe({
      next:
    
      (response: AvaFe) => {
        this.showLoading = false;
        this.sendNotification(NotificationType.SUCCESS, `Un nouveau beneficiare a été créé pour ${response.idClient}`);
        this.benefs = []
      
      },error:
      (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.showLoading = false;
        this.benefs = []
      }
    })
  }
  

}
private sendNotification(notificationType: NotificationType, message: string): void {
  if (message) {
    this.notificationService.notify(notificationType, message);
  } else {
    this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
  }
}
ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}
}
