export default class ValidaPartita {
  static IVA(partitaIVA: string) {
    partitaIVA = partitaIVA.replace(/\s/g, '').replace(/-/g, '');
    if (partitaIVA.length !== 11 || !/^\d+$/.test(partitaIVA)) return false;

    //controllo logica partita iva
    const ultimaCifra = parseInt(partitaIVA[10]);
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      let digit = parseInt(partitaIVA[i]);
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    const cifraControlloCalcolata = (10 - (sum % 10)) % 10;

    return (ultimaCifra === cifraControlloCalcolata);   //true se è valida, false se non è valida
  }
}