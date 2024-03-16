import inquirer from 'inquirer'
import chalkPipe from 'chalk-pipe'

inquirer.prompt([
  {
    type: 'input',
    name: 'fav_color',
    message: "What's your favorite color",
    transformer: function(color) {
      return chalkPipe(color)(color);
    }
  }
])
  .then(
    (answers) =>
      console.log(JSON.stringify(answers, null, '  '))
  )
