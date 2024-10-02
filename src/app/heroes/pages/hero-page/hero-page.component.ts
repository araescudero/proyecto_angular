import { Component } from '@angular/core';
import { HeroresServices } from '../../services/heroes.services';
import { ActivatedRoute,Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interfaces';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent {

hero?:Hero

constructor(public heroservices:HeroresServices,
            public activateRoute:ActivatedRoute,
            public router:Router
){}

ngOnInit():void{
  this.activateRoute.params
  .pipe(
    delay(3000),
    switchMap(({id})=>this.heroservices.getHeroById(id))
  ).subscribe(hero=>{
    if(!hero) return this.router.navigate(['heroes/list']);
    this.hero=hero
    console.log({hero})
    return
  })

}


}
