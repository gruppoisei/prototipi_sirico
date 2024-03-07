export interface Richiesta {
  //   RiasFkPersonaid: number;
  RiasFkTiporichiesta: number; //REQUIRED
  //   RiasFkResponsabileidApprovazione: number; //REQUIRED
  //   RiasApprovato: boolean;
  //   RiasDataorainizioassenza: string;           //
  //   RiasDataorafineassenza: string;             //
  OraFine: any;
  OraInizio: any;
  DataFine: string;
  DataInizio: string;
  RiasNote: string; //
  RiasSysuser: string; //REQUIRED
  //   RiasSysdate: string;
  //   RiasFlagattivo: boolean;
  //AndpDocumentipersonas: string; //
  fileName: string;
  filePath: string;
}
