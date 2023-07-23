import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private snackbar: MatSnackBar,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //user form for registration
  registrationform = this.form.group({
    id: [
      '',
      Validators.compose([Validators.required, Validators.minLength(5)]),
    ],
    name: ['', Validators.required],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    gender: ['male'],
    role: [''],
    isactive: [false],
  });

  //method for user regustration
  register() {
    if (this.registrationform.valid) {
      this.service
        .registerSave(this.registrationform.value)
        .subscribe((result) => {
          console.log(result);
          this.snackbar.open(
            'Please contact Admin to enable access',
            'Registration successfully!'
          );
          this.router.navigate(['login']);
        });
    } else {
      this.snackbar.open('Please enter valid data');
    }
  }
}
