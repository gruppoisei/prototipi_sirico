import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrl: './form-textarea.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: FormTextareaComponent },]

})
export class FormTextareaComponent implements ControlValueAccessor {

  @Input() 
  callbackOnChange: (args:any ) => void | any = ([]) => {}
  

  @Input() 
  callbackOnClick: (args:any ) => void | any = ([]) => {}

  @Input() 
  callbackOnInput: (args:any ) => void | any = ([]) => {}



  @Input()
  touched = false

  @Input()
  titolo=""
  
  @Input()
  placeholder="Placeholder..."

  @Input()
  rows=2

  @Input()
  resize=false
  
  @Input()
  errore:any
  
  @Input()
  required=false


  value:string | null = null
  isDisabled?:boolean;
  
  focus=false
 


test(){
  console.log(this.errore)
  console.log(this.touched)
}
  constructor(){
  }
 
  onChangeEvent(){
    this.callbackOnChange([])
  }
  onClickEvent(){
    this.callbackOnClick([])
  }
  onInputEvent(){
    this.callbackOnInput([])
  }
  
  
  onChange = (value:string | null) => {}
  


  onTouch =()=>{}
  
  setGetFocus()
  {
    this.focus=true
  }

  setLoseFocus()
  {
    this.focus = false
  }


  writeValue(value: string): void {
    this.value =value
  }
  registerOnChange(fn:(value:string | null) =>void ): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn 
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }


  AggiornoValore()
  {
    this.onChange(this.value);
    this.onTouch();
  }


  Prova()
  {
    console.log(this.touched)
    // console.log(this.errore)
  }

}
