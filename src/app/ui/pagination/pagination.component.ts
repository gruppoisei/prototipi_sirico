import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() totalPages: number = 0; // Numero totale di pagine
  @Input() itemsPerPageOptions: number[] = [5, 10 , 15]; // Array per definire quanti elementi si vogliono visualizzare in per pagina
  @Input() itemsPerPage: number = 10; // Numero di elementi per pagina


  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(); // Evento per cambiare la pagina
  @Output() itemsPerPageChange : EventEmitter<number> = new EventEmitter<number>() // Evento per cambiare il numero di elementi visualizzabili
  currentPage: number = 1;

  goToFirstPage() {
    if(this.currentPage !== 1){
      this.currentPage = 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToLastPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage = this.totalPages;
      this.pageChange.emit(this.currentPage)
    }
  }

  goToNextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++
      this.pageChange.emit(this.currentPage)
    }
  }

  goToPreviousPage(){
    if(this.currentPage > 1){
      this.currentPage--
      this.pageChange.emit(this.currentPage)
    }
  }

    onItemsPerPageChange(event: any) {
      const value = event.target.value; // Utilizziamo la sintassi di TypeScript per gestire null o undefined
      if (value) {
        this.itemsPerPage = parseInt(value, 10); // Convertiamo il valore da stringa a numero intero
        this.itemsPerPageChange.emit(this.itemsPerPage); // Emettiamo l'evento per il cambio del numero di elementi per pagina
      }  }


}
