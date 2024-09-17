import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DangerToast } from '../../components/danger-toast/danger-toast.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]

})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);
  toaster = inject(ToastrService)
  error!: string;
  loginForm: FormGroup = this.fb.group({});
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submit(){
    if(this.loginForm.invalid) {
      this.toaster.error("Credentials not complete.",'', {toastComponent: DangerToast, timeOut: 2000 });
      return;
    }
    this.error = '';
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any)=>{
        this.auth.user = res;
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigateByUrl('/');
        console.log(res);
      },
      error: (err: any)=>{
        console.log(err);
        if(err.error === "Invalid credentials" || err.error === "User not found"){
          this.error = "Incorrect Email or Password"
          this.toaster.error(this.error,'',{
            toastComponent: DangerToast, timeOut: 2000
          });
        }
      }
    });;
  }
}
