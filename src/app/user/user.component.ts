import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon"
import { NgIf } from "../../../node_modules/@angular/common/index";
import { UserService } from './user.service';
import { User } from './user.model';
import { UserAddComponent } from './user-add/user-add.component';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserAuthDialogComponent } from './user-auth-dialog/user-auth-dialog.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {

  user!: User;
  loading = true;
  error = '';

  constructor(private userService: UserService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.dialog.open(UserAuthDialogComponent, {
      width: '450px',
      disableClose:true
    })
    this.getUsuarioLogado();
  }

  getUsuarioLogado(): void {
    this.userService.getUser(this.user.id).subscribe({
      next: (res: User) => {
        this.user = res;
        this.loading = false;
      },
      error: () => {
        this.error = "Erro ao carregar usuário";
        this.loading = false;
      }
    });
  }

  onEdit() {
    this.userService.editUser(this.user.id, this.user).subscribe();
  }

  onDelete() {
    if(confirm("Tem certeza que deseja excluir a conta?")){
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => alert("Usuário excluído com sucesso"),
        error: () => alert("Erro ao excluir usuário")
      });
    }
  }

}
