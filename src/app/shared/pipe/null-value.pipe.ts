import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullValue'
})
export class NullValuePipe implements PipeTransform {

  transform(value: any): string {
    let nullVal: string = ''
    if (value === ''){
      nullVal = '-'
    }else{
      nullVal = value
    }
    return nullVal;
  }

}
