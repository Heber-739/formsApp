import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent   {

  public formSwitches: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true,[Validators.required]],
    termsAndConditions: [false,[Validators.required, Validators.requiredTrue]]
  })  
  constructor(private fb: FormBuilder) { }


  onSave(){
    if(this.formSwitches.invalid){
      this.formSwitches.markAllAsTouched();
      return;
    }
    console.log(this.formSwitches.value)
  }


}
