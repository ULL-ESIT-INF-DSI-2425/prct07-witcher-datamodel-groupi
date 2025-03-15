/*import inquirer from "inquirer";
enum Commands {
  Quit = "Quit"
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer.prompt({ 
      type: "list", 
      name: "command",
      message: "Choose option",
      choices: Object.values(Commands)
  }).then(answers => {
      if (answers["command"] !== Commands.Quit) {
          promptUser();
      }
  })
}*/