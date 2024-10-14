import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styles: ``
})
export default class LogInComponent {

  form: FormGroup;  // Definimos form como FormGroup para evitar problemas de tipado

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router:Router) {
    // Inicializamos el formulario en el constructor
    this.form = this._formBuilder.group({
      email: this._formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
      password: this._formBuilder.nonNullable.control('', Validators.required)
    });
  }
  submit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.getRawValue();
    console.log(this.form.value);

    this._authService.logIn(email, password).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/dashboard');
      },
      error: (error) => console.log(error)
    })
  }
}
