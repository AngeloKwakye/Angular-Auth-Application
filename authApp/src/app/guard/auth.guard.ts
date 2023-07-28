import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private service: AuthService, private router: Router, private snackbar: MatSnackBar){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.service.isLoggedIn()){
        if(route.url.length > 0){
          let menu = route.url[0].path;
          if(menu == 'user'){
            if(this.service.getUserRole() == 'admin'){
              return true;
            }else{
              this.snackbar.open("Sorry you don't have access",'Dismiss',{
                duration: 3000,
                panelClass: 'my-snackbar'
              });
              this.router.navigate([''])
              return false;
            }
          } else{
            return true;
          }
        }else{
          return true;
        }
       
      }else{
        this.router.navigate(['login'])
        return false;
      }
  }
  
}
