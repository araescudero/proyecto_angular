import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/heroes';
  heroes: { name: string }[] = []; // Cambia a un arreglo de objetos
  isLoading = false;
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.fetchHeroes(); // Llamar a la función para obtener los héroes
  }

  async fetchHeroes(): Promise<void> {
    this.isLoading = true; // Indicar que está cargando
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Error al obtener los héroes.');
      }
      this.heroes = await response.json(); // Convertir la respuesta a JSON
      this.error = null; // Limpiar cualquier error anterior
    } catch (err) {
      this.error = 'No se pudo cargar a los héroes.'; // Mensaje de error
    } finally {
      this.isLoading = false; // Detener el estado de carga
    }
  }
}
