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



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TasksComponent, UserComponent, MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, MatButtonModule, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  opened = true;
  user: User | null = null;
  error = '';
  loading = true;

  toggle() {
    this.opened = !this.opened;
  }

  constructor(private userService: UserService, private dialog: MatDialog) {}
  
  
  ngOnInit(): void {
    const token = this.userService.getToken();
    if(!token){
      this.openAuthDialog();
    } else {
    }
  }
  
  openAuthDialog(){
    const ref = this.dialog.open(UserAuthDialogComponent, {
      width: '450px',
      disableClose:true,
    });
    ref.afterClosed().subscribe(result => {
      console.log("FECHOU ", result);
      if(!result) return;
      if( result.action === "Login"){
        this.doLogin(result.user);
        alert("Usuário logado com sucesso");
      }
      if( result.action === "Cadastro"){
        this.doCadastro(result.user);
        alert("Usuário cadastrado com sucesso");
      }
    })
  }

  doLogin(user: any){
    this.userService.loginUser(user).subscribe({
      next: (resp) => {
        const token = resp.headers.get('Authorization');
        if(token){
          this.userService.saveToken(token);
          this.userService.setUser(user);          
          this.getUsuarioLogado();
          console.log("logado");

        } else {
          console.error("Token não encontrado");
        }
      },
    });
  }

  doCadastro(user: any){
    this.userService.createUser(user).subscribe({
        next: (resp) => {
        const token = resp.headers.get('Authorization');
        if(token){
          this.userService.saveToken(token);
          this.getUsuarioLogado();

        } else {
          this.error = "Token não encontrado";
        }
      },
    });
  }

  getUsuarioLogado(): void {
    this.userService.getLoggedUser().subscribe({
      next: (res: User) => {
        this.userService.setUser(res);
        this.loading = false;
      },
      error: () => {
        this.error = "Erro ao carregar usuário";
        this.loading = false;
        this.userService.clearToken();
        this.openAuthDialog();
      }
    });
  }
  
}