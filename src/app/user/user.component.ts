import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

  user!: User;
  loading = true;
  error = '';
  
  constructor(private userService: UserService){}

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
