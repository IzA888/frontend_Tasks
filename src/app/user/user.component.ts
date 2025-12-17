import { AfterContentInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from "@angular/material/icon"
import { AsyncPipe, NgIf } from "@angular/common";
import { UserService } from './user.service';
import { User } from './user.model';
import { filter } from 'rxjs';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, NgIf, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  user!: User | null;
  loading = true;
  error = '';
  user$ = this.userService.user$;

    
  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getUser$()
     .pipe( filter(u => u !== null))
     .subscribe({
      next: (u) => {
        console.log("getUser$ ", u)
        this.user = u;
        this.loading = false;
      },
      error: () => {
        console.log(this.error);
      }
    });
  }

  onEdit() {
    if(this.user){
      this.userService.editUser(this.user.id, this.user).subscribe({
        next: () => alert("Usuário atualizado com sucesso"),
        error: () => alert("Erro ao atualizar usuário")
      });
    }
  }

  onDelete() {
    if(confirm("Tem certeza que deseja excluir a conta?") && this.user){
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          alert("Usuário excluído com sucesso"),
          window.location.reload();
        },
        error: () => alert("Erro ao excluir usuário")
      });
    }
  }

}
