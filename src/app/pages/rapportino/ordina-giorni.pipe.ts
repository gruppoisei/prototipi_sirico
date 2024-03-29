import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  standalone: true,
  name: 'ordinaGiorni',
})
export class OrdinaGiorniPipe implements PipeTransform {
  transform(value: any[], sortKey: string): any {
    let numberArray = []
    let stringArray = []

    numberArray = value.filter((item) => typeof item[sortKey] === 'number').sort((a, b) => a[sortKey] - b[sortKey])
    stringArray = value
      .filter((item) => typeof item[sortKey] === 'string')
      .sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1
        else if (a[sortKey] > b[sortKey]) return 1
        else return 0
      })
    // }
    const sorted = numberArray.concat(stringArray)
    return sorted
  }
}
