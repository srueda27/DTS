"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCommand(command) {
    // Return an empty string if the line is empty
    if (command.trim() == '') {
        return '';
    }
    // Split the command line on open parenthesis, pick the first part 
    const outputList = command.split('(');
    const commandType = outputList[0].trim().toUpperCase(); // Turn to upper case for case sensibility
    return commandType;
}
function getValues(command) {
    // Return an a list of empty strings if the line is empty
    if (command.trim() == '') {
        return ['', ''];
    }
    let value1 = '';
    let value2 = '';
    // Split the command line on open parenthesis, pick the second part
    if (command.includes('(') && command.includes(')')) {
        const commandValues = command.replace(')', '').split('(')[1];
        // If the command values includes a comma character means there are two values
        if (commandValues.includes(',')) {
            // Split the values by comma, and remove single qoutes from the values
            const auxValues = commandValues.replaceAll('\'', '').split(',');
            if (auxValues.length == 2) {
                value1 = auxValues[0];
                value2 = auxValues[1];
            }
            else {
                return ['', ''];
            }
        }
        else {
            // Remove all single qoutes
            value1 = commandValues.replaceAll('\'', '');
        }
    }
    return [value1, value2];
}
function extractCommandsFromInput(inputText) {
    let commands = [];
    // Extract the operation pairs (command type - command values) 
    const individualCommands = inputText.split(';');
    // For each operation pair, extract the command type, and values and create the Command object to store
    for (const commandStr of individualCommands) {
        let commandType = getCommand(commandStr); // Extract the command type
        let [commandValue1, commandValue2] = getValues(commandStr); // Extract the command values 
        // Based on the commant type create the Command object to store
        switch (commandType) {
            case 'INSERT':
                commands.push({
                    type: 'INSERT',
                    oldValue: '',
                    newValue: commandValue1
                });
                break;
            case 'UPDATE':
                commands.push({
                    type: 'UPDATE',
                    oldValue: commandValue1,
                    newValue: commandValue2
                });
                break;
            case 'DELETE':
                commands.push({
                    type: 'DELETE',
                    oldValue: commandValue1,
                    newValue: ''
                });
                break;
            default:
                if (!commandType) {
                    console.error('The command type is an empty string. The complete command is: ', commandStr);
                }
                else {
                    console.error('Unsupported command type: ', commandType, ' found.');
                }
                break;
        }
    }
    return commands;
}
exports.default = extractCommandsFromInput;
