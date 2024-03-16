import inquirer from 'inquirer';
import { Observable } from 'rxjs';
import { interval, take } from 'rxjs';
 
const numbers = interval(1000);
 
const takeFourNumbers = numbers.pipe(take(4));
 
takeFourNumbers.subscribe(x => console.log('Next: ', x));


