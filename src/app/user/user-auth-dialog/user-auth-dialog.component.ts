import { Component } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { UserLoginComponent } from "../user-login/user-login.component";
import { UserAddComponent } from "../user-add/user-add.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { User } from '../user.model';

@Component({
  selector: 'app-user-auth-dialog',
  standalone: true,
  imports: [MatDialogTitle, UserLoginComponent, MatDialogActions, MatDialogModule, MatButtonModule, MatTabsModule, UserAddComponent],
  templateUrl: './user-auth-dialog.component.html',
  styleUrl: './user-auth-dialog.component.css'
})
export class UserAuthDialogComponent {

  selectTab = 1;

  constructor(private dialogRef: MatDialogRef<UserAuthDialogComponent>){}
  
  change(index: number){
    this.selectTab = index;
  }

  Login(user: User){
    this.dialogRef.close({
      action: "Login",
      user: user
    });
    console.log(user);
  }

  Cadastro(user: User){
    this.dialogRef.close({
      action: "Cadastro",
      user: user  
    })
  }
}
