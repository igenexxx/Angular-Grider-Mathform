import {AbstractControl} from '@angular/forms';

export class CustomValidators {
  static addition(answerName: string, aName: string, bName: string) {
    return (form: AbstractControl) => {
      const { value: { [answerName]: answer, [aName]: a, [bName]: b }} = form;

      if (a + b === parseInt(answer, 10)) {
        return null;
      }

      return { equation: true };
    };
  }
}
