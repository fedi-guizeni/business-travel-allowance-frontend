import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvaType } from '../enum/ava-type';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/Role.enum';
import { AvaFe } from '../model/ava';
import { Benef } from '../model/benef';
import { Client } from '../model/client';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { AvaService } from '../service/ava.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-rg-maker-list',
  templateUrl: './rg-maker-list.component.html',
  styleUrls: ['./rg-maker-list.component.css']
})
export class RgMakerListComponent implements OnInit {
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
  public editBenef = new Benef();
  private currentBenefId:string
  public benef = new Benef();
  public agent:User;
  private currentAvaIdClient:string
  searchAva = null;
  public checkAva:boolean;
  public checkstatutsAva:boolean;
  public page =1 ;
  public pageSize =11 ;
  public status : string;
  constructor(private notificationService: NotificationService , private avaService :AvaService ,private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.getAvas(true)
  }

  public check(){
    if(this.editAva.avaType===AvaType.AUTREACTIVITE){
      return false;
    }else{
      return true
    }
  }
  public checkAu(){
    if(this.editAva.avaType===AvaType.EXPORTATEUR ||this.editAva.avaType===AvaType.MARCHEALETRANGE ){
      return false;
    }else{
      return true
    }
  }
  public checkstatutAva(){
    if(this.editAva.statutDossier!=="Active" ){
      return false;
    }else{
      return true
    }
  }

  public getAvas(showNotification: boolean):void{
    this.refreshing = true;
  
      this.subscriptions.push(
        this.avaService.getavasforRgMaker().subscribe({
          next:
        
          
          (response:AvaFe[])=>{
            this.avaService.addAvasToLocalCache(response);
            this.avas=response;
            this.refreshing=false
            if (showNotification) {
              this.sendNotification(NotificationType.SUCCESS ,`${response.length} dossiers chargés avec succès` );
              
            }
          },error:
          (errorrResponse:HttpErrorResponse)=>{
            this.sendNotification(NotificationType.ERROR, errorrResponse.error.message)
            this.refreshing = false;
  
          }
        })
      )
   
    
  }
  public onEditAva(ava:AvaFe):void{
    this.editAva=ava;
    this.currentAvaIdClient =  ava.idClient
    this.clickButton('openAvaEdit');
  
  }
  public onEditBenef(ava:AvaFe):void{
    this.editAva=ava;
    this.currentAvaIdClient =  ava.idClient
    this.clickButton('openBenefEdit');
  
  }
  public onEditBenefec(benef:Benef):void{
    this.editBenef=benef;
    this.currentBenefId =  benef.idBenef
  
    this.clickButton('openBeneeEdit');
  
  }
  

  public onUpdateAva():void{
    if( this.editAva.avaType===AvaType.AUTREACTIVITE){
      this.editAva.statutValidationDossier="Awaiting Final Regulatory Approval"  
    const formData = this.avaService.createAvaFromDate(this.currentAvaIdClient,this.editAva);
    this.subscriptions.push(
      this.avaService.UpdateAva(formData).subscribe(
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
      this.editAva.statutValidationDossier="Awaiting Final Regulatory Approval"  
      const formData = this.avaService.createAvaExMeFromDate(this.currentAvaIdClient,this.editAva);
      this.subscriptions.push(
        this.avaService.UpdateAvaExMe(formData).subscribe(
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
  public onRejectAva():void{
    if( this.editAva.avaType===AvaType.AUTREACTIVITE){
      this.editAva.statutValidationDossier="Rejected by Regulatory"  
    const formData = this.avaService.createAvaFromDate(this.currentAvaIdClient,this.editAva);
    this.subscriptions.push(
      this.avaService.UpdateAva(formData).subscribe(
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
      this.editAva.statutValidationDossier="Rejected by Regulatory"  
      const formData = this.avaService.createAvaExMeFromDate(this.currentAvaIdClient,this.editAva);
      this.subscriptions.push(
        this.avaService.UpdateAvaExMe(formData).subscribe(
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
  public onUpdateBenef():void{
   
    const formData = this.avaService.createBenefFromDateRenewal(this.currentBenefId,this.editBenef);
    this.subscriptions.push(
      this.avaService.UpdateBenef(formData).subscribe(
        (response: Benef) => {
          this.clickButton('closeEditBenefModalButton');
          this.getAvas(false);
       
          this.sendNotification(NotificationType.SUCCESS, `${response.idBenef} ${response.nomPrenomBenef} mis à jour avec succés`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
         
        }
      )
      );
      
   
  }
  
  public enquiry():void{
    if(this.auth.getUserFromLocalCache().role === Role.REGULATORY_CHECKER){
      this.status="Awaiting Final Regulatory Approval"
      console.log(this.auth.getUserFromLocalCache().role)
    }
  }

  public get isSupervisor(): boolean {
    
    return this.getUserRole() === Role.REGULATORY_CHECKER
  }


  private getUserRole(): string {
   
    return this.auth.getUserFromLocalCache().role;
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

}
