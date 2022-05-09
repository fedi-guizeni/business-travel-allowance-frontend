import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({providedIn: 'root'})
export class NotificationService {
  

  constructor(private notifier:NotifierService) { }

  public notify(type: NotificationType  , msg:string){
    this.notifier.notify(type,msg);
  }


}
