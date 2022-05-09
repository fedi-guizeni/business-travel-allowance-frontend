import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { OutputStats } from '../model/Output1';
import { AvaService } from '../service/ava.service';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public avas: OutputStats[] 
  public x1 =[];
  public y2 =[];
  constructor( private avaService :AvaService , private notificationService: NotificationService) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
public  barChartLabels:null
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = {datasets:this.x1}

  ngOnInit(): void {
this.getAvas(true)
console.log(this.x1)

  }
  
  public getAvas(showNotification: boolean):void{
    
    
      this.subscriptions.push(
        this.avaService.getAvaNumb().subscribe({
          next:
        
          
          (response:OutputStats[])=>{
            localStorage.setItem('stats1',JSON.stringify(response))
            this.avas=   response ;
           this.x1=response

            if (showNotification) {
              this.sendNotification(NotificationType.SUCCESS ,`${response.length} dossiers chargés avec succès` );
              
            }
           
          },error:
          (errorrResponse:HttpErrorResponse)=>{
            
            this.sendNotification(NotificationType.ERROR, errorrResponse.error.message)
  
          }
        })
      )
  
    
  }

  public testtt():void{
   
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
}
