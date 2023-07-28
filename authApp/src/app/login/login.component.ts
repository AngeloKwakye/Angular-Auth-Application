import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userdata: any;

  constructor(
    private form: FormBuilder,
    private snackbar: MatSnackBar,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear()
  }

  ngOnInit(): void {}

  loginform = this.form.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginform.valid) {
      this.service
        .getbyid(this.loginform.value.username)
        .subscribe((result: any ) => {
          this.userdata = result;
      //    console.log('Userdata', this.userdata);
          if (this.userdata.password === this.loginform.value.password) {
            if (this.userdata.isactive) {
              sessionStorage.setItem('username', this.userdata.id);
              sessionStorage.setItem('userrole', this.userdata.role);
              this.router.navigate(['']);
            }else{
              this.snackbar.open('In active User \n Please contact admin for access','Dismiss',{
                duration: 3000,
                panelClass: 'my-snackbar'
              })
            }
          } else{
            this.snackbar.open('Invalid credentials','Dismiss',{
              duration: 3000,
              panelClass: 'my-snackbar'
            })
            console.log(this.loginform.value)
          }
        }, (error: any)=>{
          console.log(error)
          this.snackbar.open('Username or Password Incorrect. \n Please Try again','Dismiss',{
            duration: 3000,
            panelClass: 'my-snackbar'
          })
        });
    }
  }
}
