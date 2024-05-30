import { Component, OnInit } from '@angular/core';
import { MenuDinamicoService } from '../../service/menu-dinamico.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  constructor(public menuDinamicoService: MenuDinamicoService) { }

  ngOnInit(): void {

    // carico le funzioni relative al ruolo per sfruttare i flag nel prossimo
    this.menuDinamicoService.loadFlagsAssociate();

  }


}
