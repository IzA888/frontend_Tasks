import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon"
import { NgIf } from "@angular/common";
import { UserService } from './user.service';
import { User } from './user.model';
import { MatDialog } from "@angular/material/dialog";
import { UserAuthDialogComponent } from './user-auth-dialog/user-auth-dialog.component';
import { Router } from '@angular/router';

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

  private router = inject(Router);

  constructor(private userService: UserService, private dialog: MatDialog){}

  ngOnInit(): void {
    if(!this.user){
      const ref = this.dialog.open(UserAuthDialogComponent, {
          width: '450px',
          disableClose:true,
        });
        ref.afterClosed().subscribe(result => {
          console.log(result);
          if( result.action === "Login"){
            this.userService.loginUser(result.user).subscribe({
              next: (resp) => {
                const token = resp.headers.get('Authorization');
                if(token){
                  this.userService.saveToken(token);
                  alert("Usuário logado com sucesso");
                  this.getUsuarioLogado();
                  this.router.navigate(["/"])
                } else {
                  this.error = "Token não encontrado";
                }
              },
            });
          }
          if( result.action === "Cadastro"){
            this.userService.createUser(result.user).subscribe({
               next: (resp) => {
                alert("Usuário cadastrado com sucesso");
                const token = resp.headers.get('Authorization');
                if(token){
                  this.userService.saveToken(token);
                  alert("Usuário logado com sucesso");
                  this.getUsuarioLogado();
                  this.router.navigate(["/"])
                } else {
                  this.error = "Token não encontrado";
                }
              },
            });
          }
        })
      }

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
    this.userService.editUser(this.user.id, this.user).subscribe({
      next: () => alert("Usuário atualizado com sucesso"),
      error: () => alert("Erro ao atualizar usuário")
    });
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
