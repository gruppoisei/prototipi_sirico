import {CommonModule} from '@angular/common'
import {Component, Inject} from '@angular/core'
import {RapportinoService} from '../../../service/rapportino.service'
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {GiorniDaCopiare} from '../../../dto/request/copiaGiorni'
import {OrdinaGiorniPipe} from '../ordina-giorni.pipe'
import {MatButtonModule} from '@angular/material/button'
import {GiornoDiLavoro} from '../../../dto/request/calendario'

@Component({
  selector: 'app-copia-giorno-dialog',
  standalone: true,
  templateUrl: './copia-giorno-dialog.component.html',
  styleUrl: './copia-giorno-dialog.component.scss',
  imports: [CommonModule, OrdinaGiorniPipe, MatButtonModule],
})
export class CopiaGiornoDialogComponent {
  giorniDaCopiare: GiorniDaCopiare = {
    giornoDaCopiareId: 0,
    giorniDaRiempireId: [],
  }

  constructor(
    public dialogRef: MatDialogRef<CopiaGiornoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {giorno: GiornoDiLavoro; giornoFestivo: boolean},
    public rapportinoService: RapportinoService
  ) {
    this.giorniDaCopiare.giornoDaCopiareId = data.giorno.giornoLavorativoId!
  }

  AggiungiNumero(giornoDaAggiungere: number) {
    console.log(this.data)
    let indiceGiorno = this.giorniDaCopiare.giorniDaRiempireId.findIndex((giorno) => giorno == giornoDaAggiungere)
    if (indiceGiorno == -1) {
      this.giorniDaCopiare.giorniDaRiempireId.push(giornoDaAggiungere)
    } else {
      this.giorniDaCopiare.giorniDaRiempireId.splice(indiceGiorno, 1)
      // this.giorniDaCopiare.filter(num => num != indiceGiorno)
    }
  }

  CopiaGiorni() {
    if (this.giorniDaCopiare.giorniDaRiempireId.length > 0) {
      this.rapportinoService.CopiaGiorni(this.giorniDaCopiare)
      this.dialogRef.close()
      alert('giorni copiati')
    }
  }
}
