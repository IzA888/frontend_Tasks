import { Component, Input } from '@angular/core';
import { MatIconModule } from "@angular/material/icon"
import { NgIf } from "@angular/common";
import { UserService } from './user.service';
import { User } from './user.model';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  @Input() user!: User | null;
  @Input() loading = true;
  @Input() error = '';
  
  constructor(private userService: UserService){}

  ngAfterInit(){
     this.userService.getUser$().subscribe(u => {
        this.user = u;
        this.loading = false;
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
        next: () => alert("Usuário excluído com sucesso"),
        error: () => alert("Erro ao excluir usuário")
      });
    }
  }

}
