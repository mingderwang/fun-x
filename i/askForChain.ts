import inquirer from 'inquirer';
import * as sites from 'viem/chains';
console.log(sites)
export function  askForChain() {
        return inquirer.prompt([
            {
                type: "list",
                name: "chainId",
                message: "Which network you want to connect?",
                choices: async () => {
                    return sites.map(site => ({
                        name: `${site.name} `,
                        value: site.id
                    }));
                }
            }
        ]);
    }
