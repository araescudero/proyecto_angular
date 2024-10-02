import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, pipe ,map} from 'rxjs';
import { Hero } from '../interfaces/hero.interfaces';
import { enviroments } from '../../../enviroments/enviroment';

@Injectable({providedIn: 'root'})

export class HeroresServices {
    constructor(private http: HttpClient) { }
    
    baserUrl:string=enviroments.baseUrl

    getHeroes():Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baserUrl}/heroes`)
        //http://localhost:3000/heroes
    }

    getHeroById(id:string):Observable<Hero | undefined >{
        return this.http.get<Hero>(`${this.baserUrl}/heroes/${id}`)
        .pipe(
            catchError(error=>of(undefined))
        )
    }



    addHero(hero:Hero):Observable<Hero>{
        return this.http.post<Hero>(`${this.baserUrl}/heroes`,hero)
        //http://localhost:3000/heroes/wolverine
    }

    updateHero(hero:Hero):Observable<Hero>{
        return this.http.patch<Hero>(`${this.baserUrl}/heroes/${hero.id}`,hero)
        //http://localhost:3000/heroes/wolverine =>    hero=> leopardo
    }

    deleteHeroe(id:string):Observable<boolean>{
        return this.http.delete(`${this.baserUrl}/heroes/${id}`)
        .pipe(
            catchError(error=> of (false)),
            map(resp=>true)
        )
        //http://localhost:3000/heroes
    }

}