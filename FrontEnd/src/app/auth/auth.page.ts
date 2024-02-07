import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  loginForm!:FormGroup;

  constructor(private formBuilder:FormBuilder) {
   }
   ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]]
    });
   }

   passwordStrengthValidator(control:any) {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasLowercaseLetter = /[a-z]/.test(password);
    const isValid = hasNumber && hasCapitalLetter && hasLowercaseLetter;
    if (!isValid) {
      return { passwordStrength: true };
    }
    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      
      console.log(this.loginForm.value);
    } else {
      
      console.log("Formulario no válido");
    }
  }




}
