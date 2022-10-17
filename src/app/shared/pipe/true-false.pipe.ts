import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueFalse'
})
export class TrueFalsePipe implements PipeTransform {

  transform(value: boolean): string {
    let trueFalse: string = ''
    if (value === true){
      trueFalse = 'Filled'
    }else{
      trueFalse = 'Unfilled'
    }
    return trueFalse;
  }
}
