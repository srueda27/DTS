"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function createCSV(data, filepath) {
    // Convert array of objects to CSV string
    const csvContent = data.map(row => Object.values(row).join(',')).join('\n');
    // Write to a file
    fs.writeFile(filepath, csvContent, (err) => {
        if (err) {
            console.error('There was an error writing the CSV file:', err);
        }
        else {
            console.log('CSV file has been saved.');
        }
    });
}
// Example usage
const data = [
    { id: 1, name: 'Alice', score: 88 },
    { id: 2, name: 'Bob', score: 92 },
    { id: 3, name: 'Charlie', score: 90 },
];
createCSV(data, 'example.csv');
