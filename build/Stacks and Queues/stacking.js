"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValid(s) {
    let stack = [];
    const matching = {
        "(": ")",
        "[": "]",
        "{": "}"
    };
    for (const c of s) {
        if (c in matching) { // if c is an opening bracket
            stack.push(c);
        }
        else {
            if (!stack.length) {
                return false;
            }
            let previousOpening = stack.pop();
            if (matching[previousOpening] != c) {
                return false;
            }
        }
    }
    return !stack.length;
}
;
console.log(isValid('(){}[]'));
// ***********
// Remover duplicados seguidos 'abbaca' => 'aaca' => 'ca'
function removeDuplicates(s) {
    let stack = [];
    for (const c of s) {
        if (stack.length && c == stack[stack.length - 1]) {
            stack.pop();
        }
        else {
            stack.push(c);
        }
    }
    return stack.join("");
}
;
console.log(removeDuplicates('abbaca'));
// ***************
function backspaceCompare(s, t) {
    return helper(s) == helper(t);
}
;
function helper(s) {
    let stack = [];
    for (const char of s) {
        if (stack.length && char == '#') {
            stack.pop();
        }
        else if (char != '#') {
            stack.push(char);
        }
    }
    return stack.join('');
}
console.log(helper('y#fo##f'));
console.log(helper('y#f#o##f'));
console.log(backspaceCompare('ab##', 'c#d#'));
function simplifyPath(path) {
    let stack = [];
    for (const directory of path.split('/')) {
        if (directory.length == 0 || directory == '.') {
            continue;
        }
        if (directory == '..') {
            stack.pop();
        }
        else {
            stack.push(directory);
        }
    }
    return '/' + stack.join('/');
}
;
console.log(simplifyPath('/home/'));
console.log(simplifyPath('/../'));
console.log(simplifyPath('/home//foo/'));
// ***********
// Remover las letras seguidas si una de las dos es Mayúscula
function makeGood(s) {
    let stack = [];
    for (const c of s) {
        if (stack.length && c.toUpperCase() == stack[stack.length - 1].toUpperCase() && stack[stack.length - 1] != c) {
            stack.pop();
        }
        else {
            stack.push(c);
        }
    }
    return stack.join("");
}
exports.default = makeGood;
;
console.log(makeGood("leEeetcode"));
console.log(makeGood("Ff"));
console.log(makeGood("kkdsFuqUfSDKK"));
