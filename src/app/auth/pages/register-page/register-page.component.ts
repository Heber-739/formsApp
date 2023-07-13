import { ValidatorsService } from './../../../shared/services/validators.service';
import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
import { UsernameValidator } from 'src/app/shared/validators/username-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  public formRegister: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.firstNameAndLastnamePattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],[/* new EmailValidator() */ this.emailValidator]
    ],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider],[this.usernameValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  },{validators:[
    this.validatorsService.confirmPassword('password','password2'),
  ]});

  constructor(
    private fb: FormBuilder,
    private usernameValidator:UsernameValidator,
    private validatorsService: ValidatorsService,
    private emailValidator:EmailValidator
  ) {}

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.formRegister, field);
  }
  onSubmit() {
    if (this.formRegister.invalid) {
      this.formRegister.markAllAsTouched();
      return;
    }
    console.log(this.formRegister.value);
  }
}
