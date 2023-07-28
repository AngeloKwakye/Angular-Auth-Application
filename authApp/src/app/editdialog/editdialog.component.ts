import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.css'],
})
export class EditdialogComponent implements OnInit {


  rolelist: any
  editdata: any;
  constructor(
    private form: FormBuilder,
    private service: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getallroles();
    this.getuserCode();
  }

  //user form for registration
  editform = this.form.group({
    id: [''],
    name: [''],
    password: [''],
    email: [''],
    gender: ['male'],
    role: ['', Validators.required],
    isactive: [false],
  });


  getallroles(){
    this.service.getAllroles().subscribe(result=>{
      this.rolelist = result;
    })
  }

  getuserCode(){
    if(this.data.usercode != null && this.data.usercode !=''){
      this.service.getbyid(this.data.usercode).subscribe(result=>{
        this.editdata = result;
        this.editform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          password: this.editdata.password,
          email: this.editdata.email,
          gender: this.editdata.gender,
          role: this.editdata.role,
          isactive: this.editdata.isactive,
        })
      })
    }
  }


  updateUser(){
    if(this.editform.valid){
      this.service.updateUser(this.editform.value, this.editform.value.id).subscribe(result =>{
        this.snackbar.open('User Updated Successfully','Dismiss',{
          duration: 3000,
          panelClass: 'my-snackbar'
        }) 
        this.dialog.close();
      })
    }else{
      this.snackbar.open('Invalid credentials','Dismiss',{
        duration: 3000,
        panelClass: 'my-snackbar'
      })
    }
  }
}
