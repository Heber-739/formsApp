import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, filter, map, of } from 'rxjs';
import { UsernamesService } from '../services/usernames.service';

@Injectable({providedIn: 'root'})
export class UsernameValidator implements AsyncValidator {

    constructor(private usernameService:UsernamesService) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const usernameControl:string = control.value;
        return this.usernameService.getUsernames().pipe(
            map((usernames)=>{
                const include = usernames.filter(({username})=> username == usernameControl)
               if( include.length==0) return (null)
               return {usernameInUse:true}
            }),
            delay(2000)
        )
    }
    
    


}