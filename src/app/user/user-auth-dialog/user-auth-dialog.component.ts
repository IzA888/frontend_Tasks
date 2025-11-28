import { Component } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogActions } from '@angular/material/dialog';
import { UserLoginComponent } from "../user-login/user-login.component";
import { UserAddComponent } from "../user-add/user-add.component";
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-user-auth-dialog',
  standalone: true,
  imports: [MatDialogTitle, UserLoginComponent, MatDialogActions, MatButtonModule, MatTabsModule, UserAddComponent],
  templateUrl: './user-auth-dialog.component.html',
  styleUrl: './user-auth-dialog.component.css'
})
export class UserAuthDialogComponent {

  selectTab =0;

  constructor(private dialogRef: MatDialogRef<UserAuthDialogComponent>){}
  
  close(result: string) {
    this.dialogRef.close(result);
  }
}
