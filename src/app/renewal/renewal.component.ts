import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvaType } from '../enum/ava-type';
import { NotificationType } from '../enum/notification-type.enum';
import { AvaFe } from '../model/ava';
import { AvaService } from '../service/ava.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.component.html',
  styleUrls: ['./renewal.component.css']
})
export class RenewalComponent implements OnInit ,OnDestroy {
  public avas:AvaFe[];
  private subscriptions: Subscription[] = [];
  public refreshing: boolean;
 statut="non-renouvele";
  searchAva = null;
  public editAva = new AvaFe();
  private currentAvaIdClient:string;
  public page =1 ;
  public pageSize =11 ;
  constructor(private notificationService: NotificationService , private avaService :AvaService) { }
 

  ngOnInit(): void {
    this.getAvas(true);
  }

  public getAvas(showNotification: boolean):void{
    this.refreshing = true;
    this.subscriptions.push(
      this.avaService.getavasforRenewal().subscribe({
        next:
      
        
        (response:AvaFe[])=>{
          this.avaService.addAvasToLocalCache(response);
          this.avas=response;
          this.refreshing=false
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS ,`${response.length}  dossies chargés avec succès` );
            
          }
        },error:
        (errorrResponse:HttpErrorResponse)=>{
          this.sendNotification(NotificationType.ERROR, errorrResponse.error.message)
          this.refreshing = false;

        }
      })
    )
  }
  public onEditRAva(selectedAva:AvaFe):void{
    this.editAva = selectedAva;
    this.currentAvaIdClient=selectedAva.idClient;
    
    this.clickButton("openAvaInfo");
  }


  public onValidAva():void{
   if( this.editAva.avaType===AvaType.AUTREACTIVITE){
   
    const formData = this.avaService.createAvaFromDateRenewal(this.currentAvaIdClient,this.editAva);
    this.subscriptions.push(
      this.avaService.RenewalAva(formData).subscribe(
        (response: AvaFe) => {
          this.clickButton('closeEditUserModalButton');
          this.getAvas(false);
       
          this.sendNotification(NotificationType.SUCCESS, `${response.idClient} ${response.avaType} mis à jour avec succés`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
         
        }
      )
      );

   }else{
 
    const formData = this.avaService.createAvaExMFromDateRenewal(this.currentAvaIdClient,this.editAva);
    this.subscriptions.push(
      this.avaService.RenewalAvaExMe(formData).subscribe(
        (response: AvaFe) => {
          this.clickButton('closeEditUserModalButton');
          this.getAvas(false);
       
          this.sendNotification(NotificationType.SUCCESS, `${response.idClient} ${response.avaType} mis à jour avec succés`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
         
        }
      )
      );
   }
    
  }

 
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
  private clickButton(buttonId:string):void{
    document.getElementById(buttonId).click();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
