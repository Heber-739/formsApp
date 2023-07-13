import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value

        const httpCallObservable = new Observable<ValidationErrors | null>((subsriber)=>{

            
            if(email === 'heber@moby.com'){
                subsriber.next({emailTaken:true})
                subsriber.complete()
                // return;
            }
            subsriber.next(null);
                subsriber.complete()
        }).pipe(
            delay(3000)
        )
    return httpCallObservable
    }
}


    /* 
    return of({
        emailTaken:true
    }).pipe(
        delay(3000)
    ) */