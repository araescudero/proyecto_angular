import { Component, OnInit,Input } from '@angular/core';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{

  @Input()
  hero!:Hero;

  ngOnInit(): void {
    if(!this.hero) throw Error('el nombre el requerido')
  }
}
