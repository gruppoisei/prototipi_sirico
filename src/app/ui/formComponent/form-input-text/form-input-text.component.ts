import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input-text',
  templateUrl: './form-input-text.component.html',
  styleUrl: './form-input-text.component.scss',
  providers:[{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormInputTextComponent},]

})
export class FormInputTextComponent implements ControlValueAccessor {
 

  @Input()
  dirty:any;

  @Input()
  titolo=""
  
  @Input()
  placeholder?=""
  
  @Input()
  errore:any

  value:string = ""

  isDisabled?:boolean;

onChange = (value:string) => {}
onTouch =()=>{}


constructor(){}


 
  writeValue(value: string): void {
    this.value =value
  }
  registerOnChange(fn:(value:string) =>void ): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn 
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

 Prova()
 {
  console.log(this.errore)
 }
  AggiornoValore()
  {
    this.onChange(this.value);
    this.onTouch();
  }

}