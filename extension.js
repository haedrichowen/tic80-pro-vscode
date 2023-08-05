// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require("vscode");
var Tic80ProTerminal = null;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  let tic80ProSetup = vscode.workspace.getConfiguration("Tic80Pro");
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  var disposable = vscode.commands.registerTextEditorCommand(
    "extension.runTic80Pro",
    function(textEditor) {
      // The code you place here will be executed every time your command is executed

      textEditor.document.save();

      const cart = tic80ProSetup["mainFilePath"];

      const path = tic80ProSetup["executablePath"];
      const args = [cart];

      if (Tic80ProTerminal) Tic80ProTerminal.dispose();

      Tic80ProTerminal = vscode.window.createTerminal("tic80pro", path, args);
      Tic80ProTerminal.show();
    }
  );

  context.subscriptions.push(disposable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
