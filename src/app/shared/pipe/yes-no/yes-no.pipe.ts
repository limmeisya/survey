import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {

  transform(value: boolean): string {
    let trueFalse: string = ''
    if (value === true){
      trueFalse = 'Yes'
    }else{
      trueFalse = 'No'
    }
    return trueFalse;
  }

}
