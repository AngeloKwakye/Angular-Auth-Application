import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditdialogComponent } from '../editdialog/editdialog.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  displayedColumns: string[] = ['username', 'name', 'email','role', 'status', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AuthService, private dialog: MatDialog) {
    this.getusers();

   }

   userlist: any;
   
   dataSource: any;

  ngOnInit(): void {
  }


  getusers(){
    this.service.getAll().subscribe(result =>{
      this.userlist = result;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  updateuser(id: any): void{
    const dialog = this.dialog.open(EditdialogComponent,{
      width: '50%',
      data:{
        usercode: id
      }
    });
    dialog.afterClosed().subscribe(result => {
      this.getusers();
    })
  }

  opendialog(){

  }
}
