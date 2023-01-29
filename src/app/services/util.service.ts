import { formatCurrency } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  public monney(value:string)
  {
    //e.g. transform a string
    // return value.split('').map((x,i)=>i%2?x:'*').join('');
    //or
    let val= value
    if(value!=null){
      val = formatCurrency(+value,'fr-FR'," Ariary ")
    }
    return val;
  }
}
