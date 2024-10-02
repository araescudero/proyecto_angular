import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher, Hero } from '../../interfaces/hero.interfaces';
import { HeroresServices } from '../../services/heroes.services';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component'

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent  implements OnInit{

heroForm=new FormGroup({
  id:               new FormControl<string> (''),
  superhero:        new FormControl<string> (''),
  publisher:        new FormControl <Publisher> (Publisher.DCComics),
  alter_ego:        new FormControl (''),
  first_appearance: new FormControl (''),
  characters:       new FormControl (''),
  alt_img:         new FormControl (''),
})


  publishers=
  [
  {id:'DC Comics',desc:'DC - Comics'},
  {id:'Marvel Comics',desc:'Marvel - Comics'},

]

constructor(
  public heroservice:HeroresServices,
  public activatedRoute:ActivatedRoute,
  public router:Router,
  public snackbar:MatSnackBar,
  public dialog:MatDialog
){}

get currentHero():Hero{
  const hero=this.heroForm.value as Hero
  return hero
}


ngOnInit(): void {
  if(!this.router.url.includes('edit')) return
  this.activatedRoute.params
  .pipe(
    switchMap(({id})=>this.heroservice.getHeroById(id)),
  ).subscribe(hero=>{
    if(!hero) return this.router.navigateByUrl('/')
      this.heroForm.reset(hero)
    return
  })
}

onSubmit():void{
  if(this.heroForm.invalid) return

  if(this.currentHero.id){
    this.heroservice.updateHero(this.currentHero)
    .subscribe(hero=>{
      this.showSnackBar(`${hero.superhero} actualizado`)
    })
    return
  }

this.heroservice.addHero(this.currentHero)
.subscribe(hero=>{
  this.showSnackBar(`${hero.superhero} creado`)
})

}

showSnackBar(message:string):void{
  this.snackbar.open(message,'realizado',{
    duration:2500
  })
}

onDeleteHero(){
  if(!this.currentHero.id) throw Error('El heroe es requerido')
    const dialogRef=this.dialog.open(ConfirmDialogComponent)

  dialogRef.afterClosed().subscribe(result=>{
  console.log('el dialogo fue cerrado')
})
}



}
