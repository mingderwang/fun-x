import inquirer from 'inquirer';
import { askForChain } from './i/';

askForChain().then((a) => console.log(`${a.chainId} in used`))
