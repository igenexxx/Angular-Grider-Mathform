import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import {CustomValidators} from '../custom-validators';
import {delay, filter, scan} from 'rxjs/operators';

enum Status {
  Invalid = 'INVALID',
  Valid = 'VALID',
}

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [CustomValidators.addition('answer', 'a', 'b')]);

  constructor() { }

  ngOnInit(): void {
    this.mathForm.statusChanges.pipe(
      filter(status => status === Status.Valid),
      delay(300),
      scan((acc) => {
        const numberSolved = acc.numberSolved + 1;
        return {
          ...acc,
          numberSolved,
          averageTime: (new Date().getTime() - acc.startTime.getTime()) / numberSolved / 1000,
        };
      }, { numberSolved: 0, startTime: new Date(), averageTime: 0 }),
    ).subscribe(({ averageTime}) => {
      this.secondsPerSolution = averageTime;
      this.mathForm.patchValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: '',
      });
    });
  }

  private randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

}
