import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';
import { HeroresServices } from '../../services/heroes.services';


@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

   heroes:Hero[]=[]

   constructor (public heroServices:HeroresServices){}

  ngOnInit(): void {
    this.heroServices.getHeroes()
    .subscribe(heroes=>this.heroes=heroes)
  }

}
