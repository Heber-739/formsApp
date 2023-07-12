import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html'
})
export class BasicPageComponent implements OnInit {

  public formBasicPage: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    price: new FormControl(0, [Validators.min(0)]),
    inStorage: new FormControl(0,[Validators.min(0)]),
  })

  constructor() { }

  ngOnInit() {
  }


  isValidField(field: string):boolean | null{
        return this.formBasicPage.controls[field].errors && this.formBasicPage.controls[field].touched 
  }

  getFieldError(field:string):string | null{
    if(!this.formBasicPage.controls[field]) return null;

    const errors = this.formBasicPage.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
          case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength } caracteres`
      }
    }
    return null;

  }

  onSave(){
    if ( this.formBasicPage.invalid){
      this.formBasicPage.markAllAsTouched();
      return;
    }

    console.log(this.formBasicPage.value);
    
    this.formBasicPage.reset()
  }

}
