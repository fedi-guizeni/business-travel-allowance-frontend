import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { from, Subscription } from 'rxjs';
import { AvaType } from 'src/app/enum/ava-type';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AvaFe } from 'src/app/model/ava';

import { Client } from 'src/app/model/client';
import { User } from 'src/app/model/user';
import { AuthenticationService } from '../authentication.service';
import { AvaService } from '../ava.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-ava-form',
  templateUrl: './ava-form.component.html',
  styleUrls: ['./ava-form.component.css']
})
export class AvaFormComponent implements OnInit ,OnDestroy{
  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  public refreshing: boolean;
  public avas:AvaFe[];
  public clientId:string;
  public client= new Client();
  public dat:Number;
  public avaTypee:string;
  public  selectedAva: AvaFe;
  public editAva = new AvaFe();
  public agent:User;

  
  constructor(private notificationService: NotificationService , private avaService :AvaService ,private auth:AuthenticationService) { }

  ngOnInit(): void {
  
    this.agent=this.auth.getUserFromLocalCache()
    
  }

  public onAvaFe(avaFe:AvaFe ):void{
          this.showLoading = true;
          if(avaFe.avaType===AvaType.AUTREACTIVITE){  
             this.subscriptions.push(
            this.avaService.addAvaFe(avaFe).subscribe({
              next:
            
              (response: AvaFe) => {
                this.showLoading = false;
                this.sendNotification(NotificationType.SUCCESS, `Un nouveau dossier a été créé pour ${response.idClient}`);
              
              },error:
              (errorResponse: HttpErrorResponse) => {
                this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
                this.showLoading = false;
              }
            })
          );  }else
            { this.avaService.addAvaExMe(avaFe).subscribe({
            next:
          
            (response: AvaFe) => {
              this.showLoading = false;
              this.sendNotification(NotificationType.SUCCESS, `Un nouveau dossier a été créé pour ${response.idClient}`);
            
            },error:
            (errorResponse: HttpErrorResponse) => {
              this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
              this.showLoading = false;
            }
          })
        }
      
      }

   public inputdisable(s:string):boolean{
     if(s===AvaType.AUTREACTIVITE){ 
       return true;
     }
      
   }
   public inputdisableAutre(s:string):boolean{
     if(s===AvaType.EXPORTATEUR || s===AvaType.MARCHEALETRANGE ){ 
       return true;
     }
      
   }
   public inputdisableBct(s:string):boolean{
   
     if(s ==='' ){ 
       return true;
     }
     
   }
  
  
  public getClient(client:Client):void{
    
   
    this.subscriptions.push(
      this.avaService.getClient(client).subscribe({
        next:
      
        
        (response:Client)=>{
         
          this.client=response;
          
         
            this.sendNotification(NotificationType.SUCCESS ,`les donnees de ${response.lastName}  chargés avec succès` );
            
          
        },error:
        (errorrResponse:HttpErrorResponse)=>{
          this.sendNotification(NotificationType.ERROR, errorrResponse.error.message)
          this.refreshing = false;

        }
      })
    )

  }
 
 public calcDat(caht:Number|any , ava:string):void{
 if(ava===AvaType.EXPORTATEUR){
  let x=caht*0.1
  
  this.dat=x;
 }
 if(ava===AvaType.AUTREACTIVITE){
  let x=caht*0.08
  
  this.dat=x;
 }
 

 }
 public avaType (avatype:string):void{
   this.avaTypee=avatype
   console.log(avatype)

 }
 public toggle():void{
   var x =document.getElementById('listAva')
   if(x.hidden===true){
     x.hidden=false
   }else{
     x.hidden=true
   }
 }



 private clickButton(buttonId:string):void{
  document.getElementById(buttonId).click();
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

