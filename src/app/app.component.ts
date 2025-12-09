import { Component, OnInit } from '@angular/core';
import { TasksComponent } from "./tasks/tasks.component";
import { UserComponent } from "./user/user.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthDialogComponent } from './user/user-auth-dialog/user-auth-dialog.component';
import { User } from './user/user.model';
import { DialogRef } from '@angular/cdk/dialog';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TasksComponent, UserComponent, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  opened = true;
  user!: User;
  error = '';
  loading = true;

  toggle() {
    this.opened = !this.opened;
  }

  constructor(private userService: UserService, private dialog: MatDialog) {}
  
  private token = this.userService.getToken();

  ngOnInit(): void {
    if(!this.token){
      const ref = this.dialog.open(UserAuthDialogComponent, {
          width: '450px',
          disableClose:true,
        });
        ref.afterClosed().subscribe(result => {
          console.log(result);
          if( result.action === "Login"){
            this.doLogin(result.user, ref);
          }
          if( result.action === "Cadastro"){
            this.doCadastro(result.user, ref);
          }
        })
      }
    this.userService.getUser$().subscribe(u => {
        this.user = u!;
    });
  }


  doLogin(user: any, dialogRef: any){
    this.userService.loginUser(user).subscribe({
      next: (resp) => {
        const token = resp.headers.get('Authorization');
        if(token){
          this.userService.saveToken(token);
          alert("Usuário logado com sucesso");
          this.userService.setUser(user);
          dialogRef.close();

          setTimeout(() => {
            this.getUsuarioLogado();
          }, 50);
        } else {
          this.error = "Token não encontrado";
        }
      },
    });
  }

  doCadastro(user: any, dialogRef: any){
    this.userService.createUser(user).subscribe({
        next: (resp) => {
        alert("Usuário cadastrado com sucesso");
        const token = resp.headers.get('Authorization');
        if(token){
          this.userService.saveToken(token);
          alert("Usuário logado com sucesso");
          dialogRef.close();
          setTimeout(() => {
            this.getUsuarioLogado();
          }, 50);
        } else {
          this.error = "Token não encontrado";
        }
      },
    });
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
  
}