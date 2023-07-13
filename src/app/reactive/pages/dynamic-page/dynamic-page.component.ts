import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  public formDynamic: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Hero', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder) {}

  isValidField(field: string): boolean | null {
    return (
      this.formDynamic.controls[field].errors &&
      this.formDynamic.controls[field].touched
    );
  }
  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.formDynamic.controls[field]) return null;
    const errors = this.formDynamic.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  get favoriteGames() {
    return this.formDynamic.get('favoriteGames') as FormArray;
  }

  onSubmit(): void {
    if (this.formDynamic.invalid) {
      this.formDynamic.markAllAsTouched();
      return;
    }
    (this.formDynamic.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.formDynamic.reset();
  }

  onAddToFavorite() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }
}
