export interface Richiesta {
  //   RiasFkPersonaid: number;
  RiasFkTiporichiesta: number //REQUIRED
  //   RiasFkResponsabileidApprovazione: number; //REQUIRED
  //   RiasApprovato: boolean;
  RiasDataorainizioassenza: string //
  RiasDataorafineassenza: string //
  RiasNote: string //
  RiasSysuser: string //REQUIRED
  //   RiasSysdate: string;
  //   RiasFlagattivo: boolean;
  //AndpDocumentipersonas: string; //
  fileName: string
}
