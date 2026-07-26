import { Invoice } from './Classes/invoices.js';
import type { HasFormatter } from "./intrerfaces/hasformatter.js";
import { Payment } from './Classes/payment.js';
import { ListTemplate } from './Classes/List template.js';

interface HasName {
  name: string;
}

interface HasNameAndUID extends HasName {
  uid: number;
}

const form: HTMLFormElement = document.querySelector('.new-item-form') as HTMLFormElement;
console.log(form.children);

// inputs
const type: HTMLInputElement = document.querySelector('#type') as HTMLInputElement;
const tofrom: HTMLInputElement = document.querySelector('#tofrom') as HTMLInputElement;
const details: HTMLInputElement = document.querySelector('#details') as HTMLInputElement;
const amount: HTMLInputElement = document.querySelector('#amount') as HTMLInputElement;

// list template instance
const ul: HTMLUListElement = document.querySelector('.item-list') as HTMLUListElement;
const list: ListTemplate = new ListTemplate(ul);

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  console.log('form submit');

  let doc: HasFormatter;
  if (type.value === 'invoice') {
    doc = new Invoice(tofrom.value, details.value, amount.valueAsNumber);
  } else {
    doc = new Payment(tofrom.value, details.value, amount.valueAsNumber);
  }
  
  list.render(doc, type.value, 'end');
});

// Generics
const addUID = <T extends { name: string }>(obj: T) => {
  let uid = Math.floor(Math.random() * 100);
  return { ...obj, uid };
}
// const addUID = <T extends object>(obj: T) => {
//   let uid = Math.floor(Math.random() * 100);
//   return {...obj, uid};
// }
// Removed duplicate non-generic addUID implementation to avoid redeclaration error
let docOne = addUID({ name: 'yoshi', age: 40 });
//let docTwo = addUID('shaun');
console.log(docOne.name);
const docThree = {
    uid: 1,
    resourceName: 'person',
    data: { name: 'shaun' }
};
const docFour = {
    uid: 1,
    resourceName: 'shoppingList',
    data: ['bread', 'milk']
};
console.log(docThree, docFour);