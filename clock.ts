//import { Observable } from 'rxjs';

function x(subscriber: string, a) {
    console.log(subscriber)
    console.log(a)
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
 
  return function unsubscribe() {
    clearInterval(intervalId);
  };
}
 
const unsubscribe = x({ next: (x) => console.log(x) });
 
// Later:
  setTimeout(() => {
    unsubscribe(); // dispose the resources
  }, 5000);

