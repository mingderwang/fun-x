import { input, confirm } from '@inquirer/prompts';
const getMessage = () => 'ask me anything'; 

const x = await Promise.resolve('yes or no');
const promise = new Promise((resolve) => {
 resolve('please confirm')
})
 
const answer = await confirm(
 { message: await promise }
);
console.log(answer)

