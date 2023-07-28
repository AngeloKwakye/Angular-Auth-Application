import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
 
  title = 'authApp';
  menurequired = false;
  adminuser = false;

  constructor( private router: Router, private service: AuthService){

  }

  ngDoCheck(): void {
    let currenturl = this.router.url
    if(currenturl == '/login' || currenturl == '/register'){
      this.menurequired = false;
    }else{
      this.menurequired = true;
    }
    if(this.service.getUserRole()=== 'admin'){
      this.adminuser = true;
    }else{
      this.adminuser = false;
    }
  }
}
