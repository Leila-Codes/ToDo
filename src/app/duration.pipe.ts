import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  padText(input: string, length?: number) {
    if (!length) {
      length = 2;
    }

    while (input.length < length) {
      input = "0" + input;
    }

    return input;
  }

  transform(value?: number, ...args: unknown[]): unknown {
    const ts = new Date(value || 0);

    const mins = this.padText(ts.getUTCMinutes().toString()),
      secs = this.padText(ts.getUTCSeconds().toString());

    return `${mins}:${secs}`;
  }

}
