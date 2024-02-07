import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
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
    if (this.registerForm.valid) {
      // Aquí puedes manejar la lógica para enviar el formulario
      console.log(this.registerForm.value);
    } else {
      // Aquí puedes manejar la lógica para mostrar errores al usuario
      console.log("Formulario no válido");
    }
  }
}


