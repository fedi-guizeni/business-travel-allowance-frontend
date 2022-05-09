import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from './service/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,OnDestroy {
   public showsidenav:boolean

  constructor( private auth:AuthenticationService) { }
 
  ngOnInit(): void {
    this.showsidenav=this.auth.isUserLoggedIn();
   
 }
 ngOnDestroy(): void {
  
  }

  
} 

