import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SuccessToast } from '../../components/success-toast/success-toast.component';
import { DangerToast } from '../../components/danger-toast/danger-toast.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]

})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  registerForm: FormGroup = this.fb.group({});
  auth = inject(AuthService);
  router = inject(Router);
  toaster = inject(ToastrService)
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: ()=> this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }
  submit(){
    if(this.registerForm.invalid){
      this.toaster.error("Register form is incomplete", '', {
        toastComponent: DangerToast,
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
      return;
    } 


    this.auth.register(this.registerForm.value).subscribe({
      next: (res: any)=>{
        this.toaster.success('Account created successfully', '', {
          toastComponent: SuccessToast,
          positionClass: 'toast-top-right',
          timeOut: 2000
        })
        this.router.navigateByUrl('/login');
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl)=>{
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }
}
