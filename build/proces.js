"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractCommandsFromInput_2(inputText) {
    const commands = [];
    // Extract individual commands from the input text
    const individualCommands = inputText.split(';');
    // For each command extract the command type, old and new values, and create the Command object to store
    individualCommands.forEach(commandStr => {
        let commandType = "";
        let commandOldValue = "";
        let commandNewValue = "";
        // Separate the command value pairs (command type - command value)
        const commandValuesPair = commandStr.replace(')', '').split('(');
        let commandValues = commandValuesPair[1];
        // Upper case the command type to avoid case sensibility
        commandType = commandValuesPair[0].toUpperCase();
        // Define the old values and new values to store based on the command type
        if (commandType == 'UPDATE') {
            //	We use $ as a wildcard with this format "','" to avoid messing with values with commas
            const auxValues = commandValues.replace(/','/g, '$').replaceAll('\'', '').split('$'); // Remove single quotes from the values
            commandOldValue = auxValues[0];
            commandNewValue = auxValues[1];
        }
        else {
            commandValues = commandValues.replaceAll('\'', ''); // Remove single quotes from the values
            if (commandType == 'INSERT') {
                commandNewValue = commandValues;
            }
            else {
                commandOldValue = commandValues;
            }
        }
        // Based on the command type store the type, the old and new values
        switch (commandType) {
            case 'INSERT':
                commands.push({
                    type: 'INSERT',
                    oldValue: '',
                    newValue: commandNewValue
                });
                break;
            case 'UPDATE':
                commands.push({
                    type: 'UPDATE',
                    oldValue: commandOldValue,
                    newValue: commandNewValue
                });
                break;
            case 'DELETE':
                commands.push({
                    type: 'DELETE',
                    oldValue: commandOldValue,
                    newValue: ''
                });
                break;
            default:
                console.error('Unsupported command type:', commandType);
                break;
        }
    });
    return commands;
}
exports.default = extractCommandsFromInput_2;
