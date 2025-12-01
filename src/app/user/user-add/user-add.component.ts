import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogContent } from "@angular/material/dialog/index";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { User } from '../user.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {

  user!: User;

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

}
